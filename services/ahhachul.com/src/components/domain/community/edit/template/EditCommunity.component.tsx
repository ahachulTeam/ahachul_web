import { useEffect, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';

import { fetchSubwayLines } from '@/apis/request/subway';
import { FormComponent } from '@/components';
import { communityTypeFormOptions } from '@/constants';
import { useEditCommunityForm } from '@/hooks/domain/community';
import { useFetchCommunityDetail } from '@/services/community';
import { useActivity } from '@/stackflow';
import type { WithPostId } from '@/types';

import * as S from './EditCommunity.styled';

const EditCommunity = ({ id }: WithPostId) => {
  const { isActive } = useActivity();

  const { data: post } = useFetchCommunityDetail(id);
  const { data: subwayLineResponse } = useQuery({
    queryKey: subwayQueryKeys.subwayLine(),
    queryFn: fetchSubwayLines,
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
  });
  const subwayLines = subwayLineResponse?.data.result.subwayLines ?? [];

  const { methods, isPending, handleImageUpload, handleImageDelete, submit } = useEditCommunityForm(
    id,
    post.categoryType,
    {
      title: post.title,
      content: post.content,
      categoryType: post.categoryType,
      subwayLineId: String(post.subwayLineId),
      stationId: post.stationId ? String(post.stationId) : '0',
      removeFileIds: [],
      images:
        post.images.map(image => ({
          data: null,
          url: image.imageUrl,
          id: image.imageId ?? null,
        })) ?? [],
    },
  );
  const selectedSubwayLineId = String(methods.watch('subwayLineId') ?? '');
  const selectedStationId = String(methods.watch('stationId') ?? '0');

  const stationOptions = useMemo<Record<string, string>>(() => {
    const selectedLine = subwayLines.find(line => String(line.id) === selectedSubwayLineId);

    if (!selectedLine) {
      return { '0': '선택 안함' };
    }

    return {
      '0': '선택 안함',
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
    <FormProvider {...methods}>
      <S.FormContainer onSubmit={submit}>
        <FormComponent.ImageUpload
          name="images"
          label="사진 첨부"
          onDeleteImg={handleImageDelete}
          onImgChange={handleImageUpload}
        />
        <FormComponent.Select name="categoryType" options={communityTypeFormOptions} />
        <FormComponent.SubwayLine name="subwayLineId" />
        <FormComponent.Station name="stationId" label="역 선택 (선택)" options={stationOptions} />
        <FormComponent.Title name="title" />
        <FormComponent.Content name="content" initialState={post.content} />
        <FormComponent.SubmitButton active={isActive} loading={isPending} onSubmit={submit} />
      </S.FormContainer>
    </FormProvider>
  );
};

export default EditCommunity;
