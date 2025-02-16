import { ListIcon, PlusIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useAuth } from '@/contexts';
import { type TypeActivities, useFlow } from '@/stackflow';
import type { KeyOf } from '@/types';

type NewBtnType = 'new' | 'list';

interface NewBtnProps {
  activityName: KeyOf<TypeActivities>;
  label?: string;
  type?: NewBtnType;
  replace?: boolean;
  checkAuth?: boolean;
}

const NewBtn = ({
  activityName,
  label = '글쓰기',
  type = 'new',
  replace = false,
  checkAuth = true,
}: NewBtnProps) => {
  const { push, replace: replacePage } = useFlow();
  const { authService } = useAuth();

  const onClick = () => {
    const action = replace ? replacePage : push;
    action(
      !checkAuth ? activityName : authService.isAuthenticated ? activityName : 'SignInPage',
      {},
      {
        animate: !replace,
      },
    );
  };

  return (
    <UiComponent.FloatButton onClick={onClick}>
      {type === 'new' ? <PlusIcon /> : <ListIcon />}
      <span>{label}</span>
    </UiComponent.FloatButton>
  );
};

export default NewBtn;
