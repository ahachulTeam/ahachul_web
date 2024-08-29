import { useFlow } from 'app/stackflow';
import { CtaType } from 'features/call-to-actions/model';

export const useCTAFlows = () => {
  const { push } = useFlow();
  // const dispatch = useAppDispatch();

  const clickStack = (title: CtaType) => () => {
    switch (title) {
      case '전체':
        push('AllServices', {});
        break;
      case '소개팅':
        push('BlindDate', {});
        break;
      default:
      // dispatch(addSnackBar({ message: '준비중이에요' }));
    }
  };

  return { clickStack };
};
