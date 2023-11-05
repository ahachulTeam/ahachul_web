import { useScrollDirection } from '@ahhachul/lib'
import { Button } from '@ahhachul/ui'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FormProvider } from 'react-hook-form'
import CommunityCategoryFilter from '../domain/community/generate/controller/CommunityCategoryFilter'
import CommunitySubwayLineFilter from '../domain/community/generate/controller/CommunitySubwayLineFilter'
import { useCommunityPostGenerate } from '../domain/community/generate/hooks/useCommunityPostGenerate'
import PageTemplate from '../public/PageTemplate'
import { PictureUploader } from '@/components/common/pictureUploader'
import { usePictureUploader } from '@/hooks/global/usePictureUploader'

function CommunityPostGenerateScreen() {
  const { pictures, provided } = usePictureUploader()
  const { isScrollUp } = useScrollDirection()

  const { methods, errors, handleClickSubmit } = useCommunityPostGenerate(pictures)

  return (
    <PageTemplate>
      <PageTemplate.ContentsSection>
        <Container>
          <PhotoSection>
            <FieldName>사진 업로드</FieldName>
            <PictureUploader {...provided} pictures={pictures} />
          </PhotoSection>

          <FormProvider {...methods}>
            <FormSection>
              <Line>
                <FieldName>게시판</FieldName>
                <CommunityCategoryFilter />
              </Line>
              <Line>
                <FieldName>호선</FieldName>
                <CommunitySubwayLineFilter />
              </Line>
              <Title>
                <FieldName>제목</FieldName>
                <Input
                  placeholder="제목을 입력하세요 (40자 이내)"
                  aria-invalid={Boolean(errors?.title?.message)}
                  {...methods.register('title', {
                    required: '제목을 입력하세요',
                  })}
                />
              </Title>
              <Content>
                <FieldName>내용</FieldName>
                <Textarea
                  placeholder="게시물 내용을 작성하세요"
                  aria-invalid={Boolean(errors?.content?.message)}
                  {...methods.register('content', {
                    required: '내용을 입력하세요',
                  })}
                />
              </Content>
            </FormSection>
          </FormProvider>

          <Rules>
            <Button label="게시물 이용규칙" size="xs" variant="secondary" />
            <p>
              국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약, 주권의 제약에
              관한 조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의
              체결·비준에 대한 동의권을 가진다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 대한민국은
              민주공화국이다. 국무회의는 정부의 권한에 속하는 중요한 정책을 심의한다. 근로조건의 기준은 인간의 존엄성을
              보장하도록 법률로 정한다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다. 모든 국민은
              근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야
              하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다.
            </p>
          </Rules>
        </Container>
      </PageTemplate.ContentsSection>

      <PageTemplate.ModalOrFloatingContents>
        <StickyArea $isOpenNavigationBar={isScrollUp}>
          <Button label="작성하기" size="md" variant="primary" type="button" onClick={handleClickSubmit} />
        </StickyArea>
      </PageTemplate.ModalOrFloatingContents>
    </PageTemplate>
  )
}

const Container = styled.section`
  width: 100%;
  padding: 30px 16px 84px 16px;
`

const PhotoSection = styled.div`
  margin-bottom: 15px;
`

const FormSection = styled.form`
  margin-bottom: 15px;
`

const Line = styled.div`
  margin-bottom: 15px;

  & > button {
    width: 100%;
  }
`

const Title = styled.div`
  margin-bottom: 15px;

  & > input {
    width: 100%;
  }
`

const Content = styled.div`
  margin-bottom: 15px;

  & > textarea {
    width: 100%;
  }
`

const Rules = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: end;
    & > button {
      margin-bottom: 10px;
      width: max-content;
      & > svg {
        transform: rotate(180deg);
      }
    }
    & > p {
      ${theme.fonts.regular10};
      color: ${theme.colors.gray_40};
      line-height: 2.1;
    }
  `}
`

const FieldName = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.semibold14};
    height: 30px;
  `}
`

const StickyArea = styled.div<{ $isOpenNavigationBar: boolean }>`
  ${({ theme, $isOpenNavigationBar }) => css`
    position: fixed;
    left: 0;
    bottom: ${$isOpenNavigationBar ? '59px' : 0};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 768px;
    border-top: 1px solid ${theme.colors.gray_25};
    padding: 14px 15px 25px 15px;
    background-color: ${theme.colors.white};
    transition: all 400ms cubic-bezier(0.43, 0.03, 0.15, 0.95);

    & > button {
      width: 100%;
    }

    @media only screen and (min-width: 480px) {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  `}
`

const Input = styled.input`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    box-sizing: border-box;
    height: 44px;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 110px;
    padding-left: 25px;
    width: auto;
    &::placeholder {
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`

const Textarea = styled.textarea`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    align-items: center;
    height: 162px;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 20px;
    padding: 12px 25px;
    resize: none;
    &::placeholder {
      ${theme.fonts.regular14};
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`

export default CommunityPostGenerateScreen