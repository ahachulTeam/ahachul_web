import type { Interpolation, Theme } from '@emotion/react';
import { Link } from 'app/stackflow';
import { complaintsContentList } from 'pages/complaint/data';
import { HTMLAttributes } from 'react';
import { objectEntries } from 'shared/lib/utils/object/object-entries';
import { FileComplaintCard } from '../FileComplaintCard/FileComplaintCard';
import * as styles from './FileComplaint.css';

const topCards = objectEntries(complaintsContentList).slice(0, 4);
const bottomCards = objectEntries(complaintsContentList).slice(4, 7);
const renderComplaintsGrid = (
  items: [
    KeyOf<typeof complaintsContentList>,
    ValueOf<typeof complaintsContentList>,
  ][],
  css: Interpolation<Theme>,
) => (
  <ul css={css}>
    {items.map(([key, { icon, label, desc }]) => (
      <li key={key}>
        <Link activityName={'ComplaintForm'} activityParams={{ slug: key }}>
          <FileComplaintCard icon={icon} title={label} description={desc} />
        </Link>
      </li>
    ))}
  </ul>
);

interface FileComplaintProps extends HTMLAttributes<HTMLDivElement> {}
export const FileComplaint = (props: FileComplaintProps) => {
  return (
    <div css={styles.wrap} {...props}>
      <div>
        <h2 css={styles.label}>지하철 환경</h2>
        {renderComplaintsGrid(topCards, styles.topGridSection)}
      </div>
      <div>
        <h2 css={styles.label}>긴급민원 요청</h2>
        {renderComplaintsGrid(bottomCards, styles.bottomGridSection)}
      </div>
    </div>
  );
};
