import { UiComponent } from 'components';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { UseIntersectionObserverProps } from 'types';
import * as s from './style';

type Props = {
  children?: React.ReactNode;
} & UseIntersectionObserverProps;

const VisibilityLoader = ({ children = <UiComponent.Spinner />, ...observerProps }: Props) => {
  const { ref } = useIntersectionObserver(observerProps);

  return (
    <div data-testid="VisibilityLoader" ref={ref} css={s.wrapper}>
      <div>{children}</div>
    </div>
  );
};

export default VisibilityLoader;
