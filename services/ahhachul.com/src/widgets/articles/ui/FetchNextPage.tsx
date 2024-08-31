import { PropsWithChildren } from 'react';
import { IntersectionOptions } from 'react-intersection-observer';
import { useIntersectionObserver } from 'shared/lib/hooks/useIntersectionObserver';
import * as styles from './FetchNextPage.css';

interface FetchNextPageOptions {
  callback: () => void;
  intersectionOptions?: IntersectionOptions;
}

export const FetchNextPage = ({
  children,
  callback,
  intersectionOptions,
}: PropsWithChildren<FetchNextPageOptions>) => {
  const { ref } = useIntersectionObserver({
    callback,
    intersectionOptions,
  });

  return (
    <div css={styles.wrap} ref={ref}>
      <div>{children}</div>
    </div>
  );
};
