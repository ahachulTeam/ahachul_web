import { useEffect, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';

import { fetchSubwayLines } from '@/apis/request/subway';
import { LayoutComponent, FormComponent } from '@/components';
import { lostFoundTypeOptions } from '@/constants';
import { useLostFoundForm } from '@/hooks/domain';
import { useActivity } from '@/stackflow';
import { mixins } from '@/styles';

const NewLostFoundPage: ActivityComponentType = () => {
  const { isActive } = useActivity();

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useLostFoundForm();
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

  return (
    <LayoutComponent.Composed navigationSlot={false}>
      <FormProvider {...methods}>
        <S.FormContainer onSubmit={submit}>
          <FormComponent.ImageUpload
            name="images"
            label="유실물 상세정보"
            onDeleteImg={handleImageDelete}
            onImgChange={handleImageUpload}
          />
          <FormComponent.Select name="lostType" options={lostFoundTypeOptions} />
          <FormComponent.SubwayLine name="subwayLineId" />
          <FormComponent.Select name="stationId" label="역 선택" options={stationOptions} />
          <FormComponent.Title name="title" />
          <FormComponent.Content name="content" />
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
};

export default NewLostFoundPage;
