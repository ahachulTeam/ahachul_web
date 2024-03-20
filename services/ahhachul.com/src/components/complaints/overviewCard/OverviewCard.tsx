import React from 'react';
import { wrap } from './style';

interface ComplaintOverviewCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function ComplaintOverviewCard(props: ComplaintOverviewCardProps) {
  const { title, description } = props;

  return (
    <article css={wrap}>
      <span>{title}</span>
      <p>{description}</p>
      {props.icon}
      {title === '온도조절' && (
        <article>
          <span>현재 온도</span>
          <p>3월 20일 오후 6:30</p>
          <div>-3.9°</div>
        </article>
      )}
    </article>
  );
}

export default ComplaintOverviewCard;
