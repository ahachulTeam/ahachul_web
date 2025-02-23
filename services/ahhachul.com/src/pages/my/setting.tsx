import type React from 'react';
import { useState, useTransition } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { CloseIcon, SearchIcon } from '@/assets/icons/system';
import { LayoutComponent } from '@/components';
import { subwayLineHexColors, subwayLineOptions } from '@/constants';
import { useFetchSubwayLines } from '@/services/subway';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import type { Stations, SubwayLineType, UserStationList } from '@/types';
import { applyHighlight } from '@/utils/text';

interface StationLabel {
  stationName: string;
  label: 'home' | 'work' | 'school' | 'favorite';
}

const LABEL_OPTIONS = [
  { id: 'home', icon: '🏠', text: '집' },
  { id: 'work', icon: '🏢', text: '회사' },
  { id: 'school', icon: '🏫', text: '학교' },
  { id: 'favorite', icon: '⭐', text: '즐겨찾는 장소' },
] as const;

const SettingPage: ActivityComponentType = () => {
  const { pop } = useFlow();
  const { data: DEFAULT_STATIONS } = useFetchSubwayLines();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [labeledStations, setLabeledStations] = useState<StationLabel[]>([]);
  const [isPending, startTransition] = useTransition();

  const setUserStations = useUserStationStore(state => state.setUserStations);

  const allStations = Object.keys(DEFAULT_STATIONS as Stations);

  const displayStations = searchTerm
    ? allStations.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    : allStations;

  const renderLineNumbers = (stationName: string) => {
    return (
      <LineNumberContainer>
        {DEFAULT_STATIONS?.[stationName as keyof typeof DEFAULT_STATIONS].map((station, idx) => (
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

  const handleStationSelect = (stationName: string) => {
    setSelectedStation(selectedStation === stationName ? null : stationName);
  };

  const handleLabelSelect = (label: StationLabel['label']) => {
    if (!selectedStation) return;

    const filteredStations = labeledStations.filter(s => s.stationName !== selectedStation);

    setLabeledStations([...filteredStations, { stationName: selectedStation, label }]);
  };

  const getDefaultLabel = () => {
    const hasHome = labeledStations.some(s => s.label === 'home');
    return hasHome ? 'work' : 'home';
  };

  const getStationLabel = (stationName: string) => {
    return labeledStations.find(s => s.stationName === stationName)?.label;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    startTransition(() => {
      setSearchTerm(value);
    });
  };

  return (
    <LayoutComponent.Base>
      <S.Container>
        <S.Headline>
          <b>즐겨찾는 역</b>을 설정해주세요
        </S.Headline>
        <S.Desc>최대 3개까지 등록할 수 있어요</S.Desc>

        <SearchWrapper>
          <SearchInputIcon />
          <SearchInput
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchWrapper>

        <SearchResults $isPending={isPending}>
          {displayStations.map((name, idx) => (
            <StationContainer key={`${name}_${idx}`}>
              <SearchResultItem onClick={() => handleStationSelect(name)}>
                {renderLineNumbers(name)}
                {applyHighlight(searchTerm, name)}
                {getStationLabel(name) && (
                  <LabelIndicator>
                    {LABEL_OPTIONS.find(l => l.id === getStationLabel(name))?.icon}
                  </LabelIndicator>
                )}
              </SearchResultItem>

              {selectedStation === name && (
                <LabelOptions>
                  {LABEL_OPTIONS.map((option, idx) => {
                    const isDisabled =
                      option.id !== getStationLabel(name) &&
                      labeledStations.some(s => s.label === option.id);

                    return (
                      <LabelButton
                        key={`${option.id}_${idx}`}
                        onClick={() => {
                          if (getStationLabel(name) === option.id) {
                            setLabeledStations(labeledStations.filter(s => s.stationName !== name));
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
              )}
            </StationContainer>
          ))}
        </SearchResults>
        <ButtonArea>
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
              padding: 16px;
              white-space: nowrap;
              &::-webkit-scrollbar {
                display: none;
              }
            `}
          >
            {labeledStations.map((item, idx) => (
              <LabelButton
                key={`${item.label}_${idx}`}
                css={css`
                  background-color: #242424;
                  color: #ffffff;
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
                      labeledStations.filter(s => s.stationName !== item.stationName),
                    );
                  }}
                />
              </LabelButton>
            ))}
          </div>
          <SubmitBtn
            onClick={() => {
              if (!labeledStations.length) {
                alert('역을 하나 이상 선택해주세요.');
                return;
              }
              const formattedStations = labeledStations.map(station => ({
                name: station.stationName,
                label: LABEL_OPTIONS.find(l => l.id === station.label)?.text || '',
                stationInfos:
                  DEFAULT_STATIONS?.[station.stationName as keyof typeof DEFAULT_STATIONS],
              }));

              setUserStations(formattedStations as unknown as UserStationList);
              setTimeout(() => {
                pop();
              }, 500);
            }}
          >
            저장하기
          </SubmitBtn>
        </ButtonArea>
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.div`
    padding: 20px;
  `,
  Headline: styled.h1`
    ${({ theme }) => css`
      font-size: 24px;
      margin-bottom: 8px;

      & > b {
        color: ${theme.colors['key-color']};
      }
    `}
  `,
  Desc: styled.p`
    color: #666;
    margin-bottom: 24px;
  `,
};

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 16px;
  &::placeholder {
    color: #999;
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
`;

const SearchResultItem = styled.button`
  width: 100%;
  padding: 12px 0;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  color: #000000;

  &:last-child {
    border-bottom: none;
  }
`;

const StationContainer = styled.div`
  border-bottom: 1px solid #f5f4f3;

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
  border: 1px solid ${props => (props.$isActive ? '#00C73C' : '#e5e5e5')};
  background-color: ${props => (props.$isActive ? '#00C73C' : 'white')};
  color: ${props => (props.$isActive ? 'white' : props.$isDefault ? '#00C73C' : '#666')};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LabelIndicator = styled.span`
  margin-left: auto;
  font-size: 16px;
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
  gap: 22px;
  padding-top: 20px;
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
  `}
`;

export default SettingPage;
