import { CTAList } from 'features/call-to-actions/data';
import { useCTAFlows } from 'features/call-to-actions/lib/useCTAFlows';
import * as styles from './CTAFlows.css';

export const CTAFlows = () => {
  const { clickStack } = useCTAFlows();

  return (
    <section css={styles.wrap}>
      <ul css={styles.btn_wrap}>
        {CTAList.map((stack) => (
          <button
            css={styles.btn}
            key={stack.title}
            onClick={clickStack(stack.title)}
          >
            {stack.icon}
            <span>{stack.title}</span>
          </button>
        ))}
      </ul>
    </section>
  );
};
