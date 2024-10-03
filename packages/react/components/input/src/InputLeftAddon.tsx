import { clsx } from 'clsx';
import { vars } from '@ahhachul/themes';
import type { InputAddonProps } from './types';
import { inputAddonStyle } from './style.css';

const InputLeftAddon = (props: InputAddonProps) => {
  const {
    size = 'md',
    color = vars.colors.$scale.blueDarkGray[300],
    children,
  } = props;

  return (
    <div
      className={clsx([
        inputAddonStyle({
          size,
        }),
      ])}
      style={{ color }}
    >
      {children}
    </div>
  );
};

InputLeftAddon.displayName = 'InputLeftAddon';
export { InputLeftAddon };
