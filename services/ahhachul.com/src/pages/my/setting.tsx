import type React from 'react';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { HomeMiniIcon, OfficeMiniIcon, SchoolMiniIcon, StarMiniIcon } from '@/assets/icons/setting';
import { CloseIcon, SearchIcon } from '@/assets/icons/system';
import { LayoutComponent } from '@/components';
import { subwayLineHexColors, subwayLineOptions } from '@/constants';
import { useFetchSubwayLines } from '@/services/subway';
import { useUserFavoriteStations } from '@/services/user';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import type { Stations, SubwayLineType } from '@/types';
import {
  estimateWalkingMinutes,
  fetchNearbySubwayStationsByCoordinates,
  normalizeStationName,
  openDaumAddressSearch,
  parseLineNameFromCategory,
} from '@/utils/location';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';
import { applyHighlight } from '@/utils/text';

type LocationMeta = {
  locationName?: string;
  roadAddress?: string;
  jibunAddress?: string;
  latitude?: number;
  longitude?: number;
  walkingMinutes?: number;
  walkingSource?: 'ADDRESS' | 'CURRENT_LOCATION' | 'MANUAL';
};

interface StationLabel {
  stationId?: number;
  stationName: string;
  label: '집' | '회사' | '학교' | '즐겨찾는 장소';
  locationMeta?: LocationMeta;
}

interface SelectedStation {
  stationId: number | null;
  stationName: string;
}

type NearbyStationCandidate = {
  stationId: number;
  stationName: string;
  subwayLineId: number;
  subwayLineName: string;
  distanceMeters: number;
  walkingMinutes: number;
};

const LABEL_OPTIONS = [
  { id: '집', icon: <HomeMiniIcon />, text: '집' },
  { id: '회사', icon: <OfficeMiniIcon />, text: '회사' },
  { id: '학교', icon: <SchoolMiniIcon />, text: '학교' },
  { id: '즐겨찾는 장소', icon: <StarMiniIcon />, text: '즐겨찾는 장소' },
] as const;

const SettingPage: ActivityComponentType = () => {
  const settingLogger = createActionLogger('my-favorite-station-setting');
  const { pop, push } = useFlow();
  const { data: stationCatalog } = useFetchSubwayLines();
  const { userStations } = useUserStationStore(state => state);
  const { mutateAsync: updateUserFavoriteStations, isPending: isSavingFavoriteStations } =
    useUserFavoriteStations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<SelectedStation | null>(null);
  const [labeledStations, setLabeledStations] = useState<StationLabel[]>([]);
  const [isNearbyLoading, setIsNearbyLoading] = useState(false);
  const [nearbyError, setNearbyError] = useState<string | null>(null);
  const [nearbyStations, setNearbyStations] = useState<NearbyStationCandidate[]>([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isPending = searchTerm !== deferredSearchTerm;

  const allStations = useMemo(
    () => Object.keys((stationCatalog as Stations) ?? {}),
    [stationCatalog],
  );

  const displayStations = deferredSearchTerm
    ? allStations.filter(name => name.toLowerCase().includes(deferredSearchTerm.toLowerCase()))
    : allStations;

  const selectedStationMeta = selectedStation
    ? labeledStations.find(station => station.stationName === selectedStation.stationName)
    : undefined;

  const renderLineNumbers = (stationName: string) => {
    return (
      <LineNumberContainer>
        {stationCatalog?.[stationName as keyof typeof stationCatalog]?.map((station, idx) => (
          <LineNumber
            key={`${stationName}_${station.parentLineId}_${idx}`}
            lineNumber={station.parentLineId}
          >
            {subwayLineOptions[String(station.parentLineId) as SubwayLineType]?.slice(0, 1)}
          </LineNumber>
        ))}
      </LineNumberContainer>
    );
  };

  const updateStationMeta = (
    stationName: string,
    updater: (meta: LocationMeta) => LocationMeta,
  ) => {
    setLabeledStations(previous =>
      previous.map(station => {
        if (station.stationName !== stationName) {
          return station;
        }
        return {
          ...station,
          locationMeta: updater(station.locationMeta ?? {}),
        };
      }),
    );
  };

  const handleStationSelect = (stationName: string) => {
    const stationId = stationCatalog?.[stationName as keyof typeof stationCatalog]?.[0]?.stationId;
    setNearbyStations([]);
    setNearbyError(null);

    setSelectedStation(previous => {
      if (previous?.stationName === stationName) {
        return null;
      }

      return {
        stationId: stationId ?? null,
        stationName,
      };
    });
  };

  const handleLabelSelect = (label: StationLabel['label']) => {
    if (!selectedStation) {
      return;
    }

    const existing = labeledStations.find(
      station => station.stationName === selectedStation.stationName,
    );
    const filteredStations = labeledStations.filter(
      station => station.stationName !== selectedStation.stationName,
    );

    setLabeledStations([
      ...filteredStations,
      {
        stationId: selectedStation.stationId ?? undefined,
        stationName: selectedStation.stationName,
        label,
        locationMeta: existing?.locationMeta,
      },
    ]);
  };

  const getDefaultLabel = () => {
    const hasHome = labeledStations.some(station => station.label === '집');
    return hasHome ? '회사' : '집';
  };

  const getStationLabel = (stationName: string) => {
    return labeledStations.find(station => station.stationName === stationName)?.label;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const resolveNearbyStationCandidates = (params: {
    stationName: string;
    lineName: string | null;
    distanceMeters: number;
  }): NearbyStationCandidate[] => {
    const normalizedSearchName = normalizeStationName(params.stationName);
    const entries = Object.entries((stationCatalog as Stations) ?? {}).filter(
      ([catalogStationName]) => {
        return normalizeStationName(catalogStationName) === normalizedSearchName;
      },
    );

    return entries.flatMap(([catalogStationName, stationInfos]) => {
      return stationInfos
        .filter(stationInfo => {
          if (!params.lineName) {
            return true;
          }
          const knownLineName =
            subwayLineOptions[String(stationInfo.parentLineId) as SubwayLineType];
          return knownLineName === params.lineName;
        })
        .map(stationInfo => ({
          stationId: stationInfo.stationId,
          stationName: catalogStationName,
          subwayLineId: stationInfo.parentLineId,
          subwayLineName:
            subwayLineOptions[String(stationInfo.parentLineId) as SubwayLineType] ??
            `${stationInfo.parentLineId}호선`,
          distanceMeters: params.distanceMeters,
          walkingMinutes: estimateWalkingMinutes(params.distanceMeters),
        }));
    });
  };

  const handleOpenAddressSearch = async () => {
    if (!selectedStation) {
      alert('주소를 설정할 역을 먼저 선택해주세요.');
      return;
    }

    try {
      const result = await openDaumAddressSearch();
      updateStationMeta(selectedStation.stationName, meta => ({
        ...meta,
        locationName: meta.locationName ?? selectedStationMeta?.label ?? '',
        roadAddress: result.roadAddress || result.address,
        jibunAddress: result.jibunAddress || result.address,
        walkingSource: 'ADDRESS',
      }));
      setNearbyError(null);
    } catch (error) {
      const message = resolveClientErrorMessage(error, '주소 검색을 실행하지 못했습니다.');
      settingLogger.fail(
        'open-address-search',
        error,
        {
          stationName: selectedStation.stationName,
        },
        message,
      );
      alert(message);
    }
  };

  const handleLocateNearbyStations = () => {
    if (!selectedStation) {
      alert('역을 먼저 선택해주세요.');
      return;
    }

    if (!navigator.geolocation) {
      alert('브라우저에서 위치 정보를 지원하지 않습니다.');
      return;
    }

    setIsNearbyLoading(true);
    setNearbyError(null);

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const stations = await fetchNearbySubwayStationsByCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            radius: 1800,
            limit: 15,
          });

          const mappedStations = stations
            .flatMap(station =>
              resolveNearbyStationCandidates({
                stationName: station.placeName,
                lineName: parseLineNameFromCategory(station.categoryName),
                distanceMeters: station.distanceMeters,
              }),
            )
            .filter(
              (station, index, self) =>
                self.findIndex(
                  item =>
                    item.stationId === station.stationId &&
                    item.subwayLineId === station.subwayLineId,
                ) === index,
            )
            .sort((a, b) => a.distanceMeters - b.distanceMeters)
            .slice(0, 8);

          setNearbyStations(mappedStations);
          if (!mappedStations.length) {
            setNearbyError('주변 지하철역을 찾지 못했습니다. 반경을 넓혀 다시 시도해주세요.');
            return;
          }

          const matchedCurrentStation = mappedStations.find(station => {
            return (
              normalizeStationName(station.stationName) ===
              normalizeStationName(selectedStation.stationName)
            );
          });
          if (matchedCurrentStation) {
            updateStationMeta(selectedStation.stationName, meta => ({
              ...meta,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              walkingMinutes: matchedCurrentStation.walkingMinutes,
              walkingSource: 'CURRENT_LOCATION',
            }));
          }
        } catch (error) {
          const message = resolveClientErrorMessage(error, '주변 지하철역을 불러오지 못했습니다.');
          setNearbyError(message);
          settingLogger.fail(
            'load-nearby-stations',
            error,
            {
              stationName: selectedStation.stationName,
            },
            message,
          );
        } finally {
          setIsNearbyLoading(false);
        }
      },
      error => {
        setIsNearbyLoading(false);
        setNearbyError('위치 권한을 허용하면 주변 역을 자동으로 찾을 수 있습니다.');
        settingLogger.warn('load-nearby-stations:permission-denied', {
          code: error.code,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  useEffect(() => {
    if (userStations.length > 0) {
      setLabeledStations(
        userStations.map(item => ({
          stationId: item.stationId,
          stationName: item.stationName,
          label: item.label as '집' | '회사' | '학교' | '즐겨찾는 장소',
          locationMeta: item.locationMeta
            ? {
                locationName: item.locationMeta.locationName ?? undefined,
                roadAddress: item.locationMeta.roadAddress ?? undefined,
                jibunAddress: item.locationMeta.jibunAddress ?? undefined,
                latitude: item.locationMeta.latitude ?? undefined,
                longitude: item.locationMeta.longitude ?? undefined,
                walkingMinutes: item.locationMeta.walkingMinutes ?? undefined,
                walkingSource: item.locationMeta.walkingSource ?? undefined,
              }
            : undefined,
        })),
      );
    }
  }, [userStations]);

  return (
    <LayoutComponent.Base>
      <S.Fixed>
        <S.Headline>
          <b>즐겨찾는 역</b>을 설정해주세요
        </S.Headline>
        <S.Desc>
          최대 4개까지 등록할 수 있고, 위치 정보로 막차 리스크를 자동 계산할 수 있어요.
        </S.Desc>

        <SearchWrapper>
          <SearchInputIcon />
          <SearchInput
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
      </S.Fixed>
      <S.Container>
        <SearchResults $isPending={isPending}>
          {displayStations.map((name, idx) => (
            <StationContainer key={`${name}_${idx}`}>
              <SearchResultItem onClick={() => handleStationSelect(name)}>
                {renderLineNumbers(name)}
                {applyHighlight(searchTerm, name)}
                {getStationLabel(name) && (
                  <LabelIndicator>
                    {LABEL_OPTIONS.find(label => label.id === getStationLabel(name))?.icon}
                  </LabelIndicator>
                )}
              </SearchResultItem>

              {selectedStation?.stationName === name && (
                <>
                  <LabelOptions>
                    {LABEL_OPTIONS.map((option, optionIndex) => {
                      const isDisabled =
                        option.id !== getStationLabel(name) &&
                        labeledStations.some(station => station.label === option.id);

                      return (
                        <LabelButton
                          key={`${option.id}_${optionIndex}`}
                          onClick={() => {
                            if (getStationLabel(name) === option.id) {
                              setLabeledStations(
                                labeledStations.filter(station => station.stationName !== name),
                              );
                            } else {
                              handleLabelSelect(option.id);
                            }
                          }}
                          $isActive={getStationLabel(name) === option.id}
                          $isDefault={!getStationLabel(name) && option.id === getDefaultLabel()}
                          disabled={isDisabled}
                        >
                          {option.icon} {option.text}
                        </LabelButton>
                      );
                    })}
                  </LabelOptions>

                  {selectedStationMeta ? (
                    <LocationMetaCard>
                      <MetaHeader>
                        <MetaTitle>역 접근 정보</MetaTitle>
                        <MetaActionRow>
                          <MetaButton type="button" onClick={handleOpenAddressSearch}>
                            주소 검색
                          </MetaButton>
                          <MetaButton type="button" onClick={handleLocateNearbyStations}>
                            현재 위치로 찾기
                          </MetaButton>
                        </MetaActionRow>
                      </MetaHeader>

                      <MetaInputGroup>
                        <MetaLabel>장소 별칭</MetaLabel>
                        <MetaInput
                          value={selectedStationMeta.locationMeta?.locationName ?? ''}
                          placeholder="예: 우리집"
                          onChange={event => {
                            updateStationMeta(name, meta => ({
                              ...meta,
                              locationName: event.target.value,
                            }));
                          }}
                        />
                      </MetaInputGroup>

                      <MetaInputGroup>
                        <MetaLabel>주소</MetaLabel>
                        <MetaReadonlyText>
                          {selectedStationMeta.locationMeta?.roadAddress ||
                            selectedStationMeta.locationMeta?.jibunAddress ||
                            '주소를 등록해주세요.'}
                        </MetaReadonlyText>
                      </MetaInputGroup>

                      <MetaInputGroup>
                        <MetaLabel>역까지 도보(분)</MetaLabel>
                        <MetaInput
                          type="number"
                          min={0}
                          max={180}
                          value={selectedStationMeta.locationMeta?.walkingMinutes ?? ''}
                          onChange={event => {
                            const numeric = Number(event.target.value);
                            updateStationMeta(name, meta => ({
                              ...meta,
                              walkingMinutes: Number.isNaN(numeric)
                                ? undefined
                                : Math.max(0, Math.min(180, numeric)),
                              walkingSource: 'MANUAL',
                            }));
                          }}
                          placeholder="예: 12"
                        />
                        <MetaHint>
                          source: {selectedStationMeta.locationMeta?.walkingSource ?? '미설정'}
                        </MetaHint>
                      </MetaInputGroup>

                      {isNearbyLoading ? (
                        <MetaHint>주변 지하철역을 탐색 중입니다...</MetaHint>
                      ) : null}
                      {nearbyError ? <MetaError>{nearbyError}</MetaError> : null}
                      {nearbyStations.length > 0 ? (
                        <NearbyList>
                          {nearbyStations.map(station => (
                            <NearbyListItem key={`${station.stationId}-${station.subwayLineId}`}>
                              <div>
                                <strong>{station.stationName}</strong> · {station.subwayLineName}
                                <MetaHint>
                                  약 {station.walkingMinutes}분 ({station.distanceMeters}m)
                                </MetaHint>
                              </div>
                              <MetaActionRow>
                                <MetaButton
                                  type="button"
                                  onClick={() => {
                                    push('SubwayTimelinePage', {
                                      stationId: station.stationId,
                                      subwayLineId: station.subwayLineId,
                                      stationName: station.stationName,
                                    });
                                  }}
                                >
                                  실시간 보기
                                </MetaButton>
                              </MetaActionRow>
                            </NearbyListItem>
                          ))}
                        </NearbyList>
                      ) : null}
                    </LocationMetaCard>
                  ) : (
                    <MetaHintBlock>
                      라벨(집/회사/학교/즐겨찾는 장소)을 먼저 선택하면 위치 설정이 가능합니다.
                    </MetaHintBlock>
                  )}
                </>
              )}
            </StationContainer>
          ))}
        </SearchResults>
        <ButtonArea>
          {labeledStations.length > 0 && (
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 8px;
                width: 100%;
                max-width: 100vw;
                overflow-x: auto;
                -ms-overflow-style: none;
                scrollbar-width: none;
                padding: 0 16px 0;
                white-space: nowrap;
                &::-webkit-scrollbar {
                  display: none;
                }
              `}
            >
              {labeledStations.map((item, idx) => (
                <LabelButton
                  key={`${item.stationName}_${item.label}_${idx}`}
                  css={css`
                    background-color: var(--ah-color-legacy-surface-inverse);
                    color: var(--ah-color-white);
                    border: 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    height: 28px;
                    font-size: 12px;
                    flex-shrink: 0;
                    padding: 0 12px;
                  `}
                >
                  {item.stationName}
                  <CloseIcon
                    css={css`
                      width: 16px;
                      height: 16px;
                      flex-shrink: 0;
                    `}
                    onClick={() => {
                      setLabeledStations(
                        labeledStations.filter(station => station.stationName !== item.stationName),
                      );
                    }}
                  />
                </LabelButton>
              ))}
            </div>
          )}
          <SubmitBtn
            onClick={async () => {
              if (!labeledStations.length) {
                alert('역을 하나 이상 선택해주세요.');
                return;
              }

              const formattedStations = labeledStations.map(station => ({
                stationName: station.stationName,
                label: LABEL_OPTIONS.find(label => label.id === station.label)?.text || '',
                ...(typeof station.stationId === 'number' ? { stationId: station.stationId } : {}),
                ...(station.locationMeta
                  ? {
                      locationMeta: {
                        ...(station.locationMeta.locationName
                          ? { locationName: station.locationMeta.locationName }
                          : {}),
                        ...(station.locationMeta.roadAddress
                          ? { roadAddress: station.locationMeta.roadAddress }
                          : {}),
                        ...(station.locationMeta.jibunAddress
                          ? { jibunAddress: station.locationMeta.jibunAddress }
                          : {}),
                        ...(station.locationMeta.latitude != null
                          ? { latitude: station.locationMeta.latitude }
                          : {}),
                        ...(station.locationMeta.longitude != null
                          ? { longitude: station.locationMeta.longitude }
                          : {}),
                        ...(station.locationMeta.walkingMinutes != null
                          ? { walkingMinutes: station.locationMeta.walkingMinutes }
                          : {}),
                        ...(station.locationMeta.walkingSource
                          ? { walkingSource: station.locationMeta.walkingSource }
                          : {}),
                      },
                    }
                  : {}),
              }));

              try {
                await updateUserFavoriteStations(formattedStations);
                settingLogger.success('save-favorite-stations', {
                  stationCount: formattedStations.length,
                });
                pop();
              } catch (error) {
                const errorMessage = resolveClientErrorMessage(
                  error,
                  '즐겨찾는 역 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
                );
                settingLogger.fail(
                  'save-favorite-stations',
                  error,
                  {
                    stationCount: formattedStations.length,
                  },
                  errorMessage,
                );
                alert(errorMessage);
              }
            }}
            disabled={isSavingFavoriteStations}
          >
            {isSavingFavoriteStations ? '저장 중...' : '저장하기'}
          </SubmitBtn>
        </ButtonArea>
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.div`
    padding: 0 0 0;
  `,
  Fixed: styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
  `,
  Headline: styled.h1`
    ${({ theme }) => css`
      font-size: 24px;
      padding: 0 20px;
      margin-bottom: 8px;

      & > b {
        color: ${theme.colors['key-color']};
      }
    `}
  `,
  Desc: styled.p`
    color: var(--ah-color-legacy-text-subtle);
    margin-bottom: 24px;
    padding: 0 20px;
  `,
};

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
  padding: 0 20px;
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ah-color-legacy-text-disabled);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  font-size: 16px;
  &::placeholder {
    color: var(--ah-color-legacy-text-disabled);
  }
`;

const LineNumberContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-right: 12px;
`;

interface LineNumberProps {
  lineNumber: number;
}

const LineNumber = styled.div<LineNumberProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => subwayLineHexColors(props.lineNumber)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

interface SearchResultsProps {
  $isPending: boolean;
}

const SearchResults = styled.div<SearchResultsProps>`
  opacity: ${props => (props.$isPending ? 0.7 : 1)};
  transition: opacity 0.2s ease;
  padding-bottom: 220px;
`;

const SearchResultItem = styled.button`
  width: 100%;
  padding: 12px 20px 12px 20px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--ah-color-legacy-border-soft);
  color: var(--ah-color-black-00);

  &:last-child {
    border-bottom: none;
  }
`;

const StationContainer = styled.div`
  border-bottom: 1px solid var(--ah-color-legacy-border-soft-alt);

  &:last-child {
    border-bottom: none;
  }
`;

const LabelOptions = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface LabelButtonProps {
  $isActive?: boolean;
  $isDefault?: boolean;
}

const LabelButton = styled.button<LabelButtonProps>`
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid
    ${props =>
      props.$isActive ? 'var(--ah-color-key-color)' : 'var(--ah-color-legacy-border-soft)'};
  background-color: ${props => (props.$isActive ? 'var(--ah-color-key-color)' : 'white')};
  color: ${props => (props.$isActive ? 'white' : 'var(--ah-color-legacy-text-subtle)')};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  & > svg > path {
    fill: ${props => (props.$isActive ? 'white' : '')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LabelIndicator = styled.span`
  margin-left: auto;
  font-size: 16px;
`;

const LocationMetaCard = styled.div`
  margin: 0 16px 12px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 12px;
  background: var(--ah-color-gray-00);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MetaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

const MetaTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--ah-color-black-00);
`;

const MetaActionRow = styled.div`
  display: flex;
  gap: 8px;
`;

const MetaButton = styled.button`
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  background: white;
  color: var(--ah-color-black-00);
`;

const MetaInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MetaLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--ah-color-legacy-text-subtle);
`;

const MetaInput = styled.input`
  height: 36px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 0 10px;
  font-size: 14px;
`;

const MetaReadonlyText = styled.div`
  min-height: 36px;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  color: var(--ah-color-black-00);
  line-height: 1.4;
`;

const MetaHint = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--ah-color-legacy-text-subtle);
`;

const MetaError = styled.p`
  margin: 0;
  font-size: 12px;
  color: #d9363e;
`;

const MetaHintBlock = styled.p`
  margin: 0 16px 12px;
  border-radius: 8px;
  background: #f6f7fb;
  color: var(--ah-color-legacy-text-subtle);
  padding: 10px 12px;
  font-size: 12px;
`;

const NearbyList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NearbyListItem = styled.li`
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 10px;
  background: white;
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const ButtonArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  padding-bottom: 32px;
`;

const SubmitBtn = styled.button`
  ${({ theme }) => css`
    font-weight: 600;
    color: white;
    width: calc(100% - 40px);
    height: 50px;
    background-color: ${theme.colors['key-color']};
    border-radius: 8px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `}
`;

export default SettingPage;
