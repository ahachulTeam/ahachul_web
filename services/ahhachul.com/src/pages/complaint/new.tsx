import { useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';

import { fetchForeignerStationGuideV2, type ForeignerLocale } from '@/apis/request/subway';
import { fetchSubwayLines } from '@/apis/request/subway';
import { LayoutComponent, FormComponent } from '@/components';
import { complaintsContentDetail } from '@/constants';
import useComplaintForm from '@/hooks/domain/complaint/useComplaintForm';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';
import { KeyOf } from '@/types';

interface ComplaintFormProps {
  slug: KeyOf<typeof complaintsContentDetail>;
}

const FOREIGNER_LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ไทย' },
  { value: 'cn', label: '中文' },
  { value: 'ko', label: '한국어' },
];

const NewComplaintPage: ActivityComponentType<ComplaintFormProps> = ({
  params: { slug },
}: {
  params: {
    slug: KeyOf<typeof complaintsContentDetail>;
  };
}) => {
  const normalizedSlug = complaintsContentDetail[slug] ? slug : 'ENVIRONMENTAL_COMPLAINT';
  const information = complaintsContentDetail[normalizedSlug];

  const { isActive } = useActivity();

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } =
    useComplaintForm(normalizedSlug);
  const [templateLocale, setTemplateLocale] = useState<ForeignerLocale>('en');
  const [templateInitialState, setTemplateInitialState] = useState('');
  const [isTemplateApplying, setIsTemplateApplying] = useState(false);
  const [templateError, setTemplateError] = useState('');
  const [isPrefillApplied, setIsPrefillApplied] = useState(false);
  const { data: subwayLineResponse } = useQuery({
    queryKey: subwayQueryKeys.subwayLine(),
    queryFn: fetchSubwayLines,
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
  });
  const subwayLines = subwayLineResponse?.data.result.subwayLines ?? [];
  const selectedSubwayLineId = String(methods.watch('subwayLineId') ?? '');
  const selectedStationId = String(methods.watch('stationId') ?? '0');
  const stationOptions = useMemo<Record<string, string>>(() => {
    const selectedLine = subwayLines.find(line => String(line.id) === selectedSubwayLineId);
    if (!selectedLine) {
      return { '0': '역 선택' };
    }

    return {
      '0': '역 선택',
      ...selectedLine.stations.reduce<Record<string, string>>((acc, station) => {
        acc[String(station.id)] = `${station.name}역`;
        return acc;
      }, {}),
    };
  }, [selectedSubwayLineId, subwayLines]);

  useEffect(() => {
    if (stationOptions[selectedStationId]) {
      return;
    }

    methods.setValue('stationId', '0');
  }, [methods, selectedStationId, stationOptions]);

  useEffect(() => {
    if (isPrefillApplied || typeof window === 'undefined') {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('prefill') !== '1') {
      setIsPrefillApplied(true);
      return;
    }

    const parsedLineId = Number(searchParams.get('subwayLineId') ?? '0');
    const parsedStationId = Number(searchParams.get('stationId') ?? '0');
    const parsedTemplateLocale = searchParams.get('templateLocale');
    const nextTemplateLocale =
      parsedTemplateLocale &&
      FOREIGNER_LOCALE_OPTIONS.some(option => option.value === parsedTemplateLocale)
        ? (parsedTemplateLocale as ForeignerLocale)
        : 'en';

    if (parsedLineId > 0) {
      methods.setValue('subwayLineId', String(parsedLineId), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    if (parsedStationId > 0) {
      methods.setValue('stationId', String(parsedStationId), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    setTemplateLocale(nextTemplateLocale);

    if (parsedLineId <= 0 || parsedStationId <= 0) {
      setIsPrefillApplied(true);
      return;
    }

    const applyPrefillTemplate = async () => {
      setIsTemplateApplying(true);
      setTemplateError('');
      try {
        const response = await fetchForeignerStationGuideV2({
          stationId: parsedStationId,
          subwayLineId: parsedLineId,
          locale: nextTemplateLocale,
        });
        const guide = response.data.result;
        methods.setValue('title', guide.templates.complaintTitleTemplate, {
          shouldDirty: true,
          shouldValidate: true,
        });
        methods.setValue('content', guide.templates.complaintBodyTemplate, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setTemplateInitialState(guide.templates.complaintBodyTemplate);
      } catch {
        setTemplateError('prefill 템플릿을 불러오지 못했습니다. 직접 입력으로 진행해주세요.');
      } finally {
        setIsTemplateApplying(false);
        setIsPrefillApplied(true);
      }
    };

    void applyPrefillTemplate();
  }, [isPrefillApplied, methods]);

  const applyForeignerTemplate = async () => {
    const stationId = Number(methods.getValues('stationId'));
    const subwayLineId = Number(methods.getValues('subwayLineId'));
    if (stationId <= 0 || subwayLineId <= 0) {
      setTemplateError('노선과 역을 먼저 선택한 뒤 템플릿을 적용해주세요.');
      return;
    }

    setIsTemplateApplying(true);
    setTemplateError('');
    try {
      const response = await fetchForeignerStationGuideV2({
        stationId,
        subwayLineId,
        locale: templateLocale,
      });
      const guide = response.data.result;
      methods.setValue('title', guide.templates.complaintTitleTemplate, {
        shouldDirty: true,
        shouldValidate: true,
      });
      methods.setValue('content', guide.templates.complaintBodyTemplate, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setTemplateInitialState(guide.templates.complaintBodyTemplate);
    } catch {
      setTemplateError('다국어 템플릿을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsTemplateApplying(false);
    }
  };

  return (
    <LayoutComponent.Composed navigationSlot={false} shouldShowBackground={false}>
      <FormProvider {...methods}>
        <S.FormContainer onSubmit={submit}>
          <S.TemplateCard>
            <S.TemplateTitle>다국어 템플릿</S.TemplateTitle>
            <S.TemplateDesc>선택한 언어 템플릿을 제목/본문에 자동 입력합니다.</S.TemplateDesc>
            <S.TemplateControls>
              <select
                value={templateLocale}
                onChange={event => setTemplateLocale(event.target.value as ForeignerLocale)}
              >
                {FOREIGNER_LOCALE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  void applyForeignerTemplate();
                }}
                disabled={isTemplateApplying}
              >
                {isTemplateApplying ? '적용 중...' : '템플릿 적용'}
              </button>
            </S.TemplateControls>
            {templateError ? <S.TemplateError>{templateError}</S.TemplateError> : null}
          </S.TemplateCard>
          <FormComponent.ImageUpload
            name="images"
            label="민원 상세정보"
            onDeleteImg={handleImageDelete}
            onImgChange={handleImageUpload}
          />
          <FormComponent.Select
            name="shortContentType"
            label={information.title}
            options={information.selectList}
            rules={{
              required: '유형을 선택해주세요',
            }}
          />
          <FormComponent.SubwayLine name="subwayLineId" />
          <FormComponent.Select name="stationId" label="역 선택" options={stationOptions} />
          <FormComponent.Title name="title" />
          <FormComponent.Content name="content" initialState={templateInitialState} />
          <FormComponent.SubmitButton active={isActive} loading={isPending} onSubmit={submit} />
        </S.FormContainer>
      </FormProvider>
    </LayoutComponent.Composed>
  );
};

const S = {
  FormContainer: styled.div`
    ${mixins.fullWidth};
    ${mixins.flexColumn};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
  `,
  TemplateCard: styled.div`
    ${mixins.sideGutter};
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.gray[10]};
    padding: 12px;
    display: grid;
    gap: 6px;
  `,
  TemplateTitle: styled.b`
    ${({ theme }) => theme.fonts.labelLarge};
    color: ${({ theme }) => theme.colors.gray[100]};
  `,
  TemplateDesc: styled.p`
    ${({ theme }) => theme.fonts.bodySmall};
    color: ${({ theme }) => theme.colors.gray[70]};
  `,
  TemplateControls: styled.div`
    display: flex;
    gap: 8px;

    select {
      flex: 1;
      height: 36px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.gray[30]};
      background: ${({ theme }) => theme.colors.gray[10]};
      padding: 0 10px;
      ${({ theme }) => theme.fonts.bodySmall};
      color: ${({ theme }) => theme.colors.gray[90]};
    }

    button {
      height: 36px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.gray[40]};
      background: ${({ theme }) => theme.colors.gray[10]};
      padding: 0 12px;
      ${({ theme }) => theme.fonts.labelSmall};
      color: ${({ theme }) => theme.colors.gray[90]};
      white-space: nowrap;
    }

    button:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.gray[60]};
    }
  `,
  TemplateError: styled.p`
    ${({ theme }) => theme.fonts.bodySmall};
    color: ${({ theme }) => theme.colors.red[60]};
  `,
};

export default NewComplaintPage;
