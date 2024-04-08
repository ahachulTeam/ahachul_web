import { theme } from 'styles';
import { inner, wrapper } from './style';

type Props = {
  size?: number;
  color?: string;
};

const Spinner = ({ size = 24, color = theme.color.static.dark.gray[900] }: Props) => (
  <div
    css={[
      wrapper,
      {
        width: `${size}px`,
        height: `${size}px`,
      },
    ]}
  >
    <div
      css={[
        inner,
        {
          borderColor: color,
        },
      ]}
    />
  </div>
);

export default Spinner;
