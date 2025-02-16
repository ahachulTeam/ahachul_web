import { css } from '@emotion/react';

import { objectEntries } from '@ahhachul/utils';

import { complaintsContentList } from '@/constants';
import { StackFlow } from '@/stackflow';
import { KeyOf, ValueOf } from '@/types';

import * as S from './ComplaintPanel.styled';

const ComplaintPanel = () => {
  const topCards = objectEntries(complaintsContentList).slice(0, 4);

  const bottomCards = objectEntries(complaintsContentList).slice(4, 7);

  const renderComplaintCards = (
    items: [KeyOf<typeof complaintsContentList>, ValueOf<typeof complaintsContentList>][],
    styleCss: ReturnType<typeof css>,
  ) => (
    <ul css={styleCss}>
      {items.map(([key, { icon, label, desc }]) => (
        <li key={key}>
          <StackFlow.Link activityName={'NewComplaintPage'} activityParams={{ slug: key }}>
            <S.Card>
              <span>{label}</span>
              <p>{desc}</p>
              {icon}
            </S.Card>
          </StackFlow.Link>
        </li>
      ))}
    </ul>
  );

  return (
    <S.Panel>
      <S.Cell>
        <S.Label>지하철 환경</S.Label>
        {renderComplaintCards(topCards, S.topSection)}
      </S.Cell>
      <S.Cell>
        <S.Label>긴급민원 요청</S.Label>
        {renderComplaintCards(bottomCards, S.bottomSection)}
      </S.Cell>
    </S.Panel>
  );
};

export default ComplaintPanel;
