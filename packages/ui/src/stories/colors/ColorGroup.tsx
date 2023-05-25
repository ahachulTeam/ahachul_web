import * as S from './styled'

export type Color = {
  label: string
  hex: string
}

interface ColorGroupProps {
  group: Color[]
}

export const ColorGroup = ({ group }: ColorGroupProps) => {
  return (
    <S.ColorGroup>
      {group.map(({ label, hex }) => (
        <S.ColorBox key={label}>
          <S.Color hex={hex}></S.Color>
          <S.Desc>
            <dt>{label}</dt>
            <dd>{hex}</dd>
          </S.Desc>
        </S.ColorBox>
      ))}
    </S.ColorGroup>
  )
}
