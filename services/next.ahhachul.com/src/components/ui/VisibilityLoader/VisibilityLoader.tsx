import { UiComponent } from '@/src/components';
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver';
import { UseIntersectionObserverProps } from '@/src/types';
import { wrapper } from './style';

type Props = {
  children?: React.ReactNode;
} & UseIntersectionObserverProps;

const VisibilityLoader = ({ children = <UiComponent.PartialLoading size="80px" />, ...observerProps }: Props) => {
  const { ref } = useIntersectionObserver(observerProps);

  return (
    <div data-testid="VisibilityLoader" ref={ref} css={wrapper}>
      <div>{children}</div>
    </div>
  );
};

export default VisibilityLoader;
