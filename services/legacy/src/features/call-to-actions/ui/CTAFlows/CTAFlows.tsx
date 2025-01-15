import type { HTMLAttributes } from 'react';

import { Link } from 'app/stackflow';
import { CTAList } from 'features/call-to-actions/data';
import { objectEntries } from 'shared/lib/utils/object/object-entries';

import * as styles from './CTAFlows.css';

interface CTAFlowsProps extends HTMLAttributes<HTMLSectionElement> {}
export const CTAFlows = ({ ...props }: CTAFlowsProps) => {
  return (
    <section css={styles.wrap} {...props}>
      <ul css={styles.btn_wrap}>
        {objectEntries(CTAList).map(([key, value]) => (
          <Link css={styles.btn} key={value.label} activityName={key} activityParams={{}}>
            {value.icon}
            <span>{value.label}</span>
          </Link>
        ))}
      </ul>
    </section>
  );
};
