import * as S from './styled'

interface ColorBoxProps {
  label: string
  hex: string
}

export const ColorBox = ({ label, hex }: ColorBoxProps) => {
  return (
    <S.ColorBox>
      <S.Color hex={hex}></S.Color>
      <S.Desc>
        <dt>{label}</dt>
        <dd>{hex}</dd>
      </S.Desc>
    </S.ColorBox>
  )
}
