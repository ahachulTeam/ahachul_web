import { inputAddonStyle } from './style.css';
import { InputAddonProps } from './types';
import { clsx } from 'clsx';

const InputLeftAddon = (props: InputAddonProps) => {
  const { size = 'md', color = 'gray', children } = props;

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
