import { PlusIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { type TypeActivities, useFlow } from '@/stackflow';
import type { KeyOf } from '@/types';

interface NewBtnProps {
  activityName: KeyOf<TypeActivities>;
}

const NewBtn = ({ activityName }: NewBtnProps) => {
  const { push } = useFlow();

  const onClick = () => push(activityName, {});

  return (
    <UiComponent.FloatButton onClick={onClick}>
      <PlusIcon />
      <span>글쓰기</span>
    </UiComponent.FloatButton>
  );
};

export default NewBtn;
