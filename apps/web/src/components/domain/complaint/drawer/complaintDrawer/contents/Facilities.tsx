import { fonts, colors } from '@ahhachul/design-system'
import { Button } from '@ahhachul/ui'
import { css } from '@emotion/react'
import { PictureUploader } from '@/components/common'
import { usePictureUploader } from '@/hooks'

export default function Facilities() {
  const { pictures, provided } = usePictureUploader()

  return (
    <div
      css={css`
        display: flex;
        gap: 15px;
        flex-direction: column;
        padding: 20px;
      `}
    >
      <div>
        <div
          css={css`
            ${fonts.medium14};
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
          `}
        >
          신고유형을 선택해주세요
        </div>
        <Button size="lg" variant="secondary" label="신고유형" />
      </div>
      <div>
        <div
          css={css`
            ${fonts.medium14};
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
          `}
        >
          내용
        </div>
        <textarea
          css={css`
            ${fonts.regular14};
            display: flex;
            align-items: center;
            height: 85px;
            width: 100%;
            border: 1px solid ${colors.gray_19};
            border-radius: 20px;
            padding: 12px 25px;
            resize: none;

            &::placeholder {
              ${fonts.regular14};
              color: ${colors.gray_40};
            }

            &[aria-invalid='true'] {
              border-color: ${colors.red_10};
            }
          `}
          placeholder="신고내용을 작성해주세요"
        />
      </div>
      <div>
        <div
          css={css`
            ${fonts.medium14};
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
          `}
        >
          사진 업로드
        </div>
        <PictureUploader {...provided} pictures={pictures} maxCount={10} />
      </div>
    </div>
  )
}
