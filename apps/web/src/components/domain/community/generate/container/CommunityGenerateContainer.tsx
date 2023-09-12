import { useScrollDirection } from '@ahhachul/lib'
import { Button } from '@ahhachul/ui'

import dynamic from 'next/dynamic'
import { FormProvider } from 'react-hook-form'
import { useArticleForm } from '../hooks/useArticleForm'
import * as S from './styled'
import { PictureUploader } from '@/components/common/pictureUploader'
import { usePictureUploader } from '@/hooks/usePictureUploader'

const CategoryFilter = dynamic(() => import('../controller/CategoryFilter'), {
  ssr: false,
})
const SubwayLineFilter = dynamic(() => import('../controller/SubwayLineFilter'), {
  ssr: false,
})

function CommunityGeneratePageContainer() {
  const { pictures, provided } = usePictureUploader()
  const { isScrollUp } = useScrollDirection()

  const { methods, errors, handleClickSubmit } = useArticleForm(pictures)

  return (
    <S.Container>
      <S.PhotoSection>
        <S.FieldName>사진 업로드</S.FieldName>
        <PictureUploader {...provided} pictures={pictures} />
      </S.PhotoSection>

      <FormProvider {...methods}>
        <S.FormSection>
          <S.Line>
            <S.FieldName>게시판</S.FieldName>
            <CategoryFilter />
          </S.Line>
          <S.Line>
            <S.FieldName>호선</S.FieldName>
            <SubwayLineFilter />
          </S.Line>
          <S.Title>
            <S.FieldName>제목</S.FieldName>
            <S.Input
              placeholder="제목을 입력하세요 (40자 이내)"
              aria-invalid={Boolean(errors?.title?.message)}
              {...methods.register('title', {
                required: '제목을 입력하세요',
              })}
            />
          </S.Title>
          <S.Content>
            <S.FieldName>내용</S.FieldName>
            <S.Textarea
              placeholder="게시물 내용을 작성하세요"
              aria-invalid={Boolean(errors?.content?.message)}
              {...methods.register('content', {
                required: '내용을 입력하세요',
              })}
            />
          </S.Content>
        </S.FormSection>
      </FormProvider>

      <S.Rules>
        <Button label="게시물 이용규칙" size="xs" variant="secondary" />
        <p>
          국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약, 주권의 제약에 관한
          조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의 체결·비준에 대한
          동의권을 가진다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 대한민국은 민주공화국이다.
          국무회의는 정부의 권한에 속하는 중요한 정책을 심의한다. 근로조건의 기준은 인간의 존엄성을 보장하도록 법률로
          정한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 모든 국민은 근로의 권리를 가진다.
          국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에
          의하여 최저임금제를 시행하여야 한다.
        </p>
      </S.Rules>

      <S.StickyArea $isOpenNavigationBar={isScrollUp}>
        <Button label="작성하기" size="md" variant="primary" type="button" onClick={handleClickSubmit} />
      </S.StickyArea>
    </S.Container>
  )
}

export default CommunityGeneratePageContainer
