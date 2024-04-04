import { CSSObject } from '@emotion/react';
import { UiComponent } from 'components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import IconListView from 'static/icons/complaints/IconListView';
import IconSubmissionView from 'static/icons/complaints/IconSubmissionView';
import { useAppSelector } from 'stores';
import { setView } from 'stores/complaints';
import { f } from 'styles';
import { ComplaintViewType } from 'types/complaints';

const COMPLAINT_VIEWS: Record<ComplaintViewType, React.ReactNode> = {
  SUBMISSION: <IconSubmissionView />,
  LIST: <IconListView />,
};

const ComplaintViewToggle = () => {
  const dispatch = useDispatch();
  const { activeView } = useAppSelector((state) => state.complaint);
  const handleChangeTab = useCallback((t: ComplaintViewType) => {
    dispatch(setView(t));
  }, []);

  return (
    <article css={wrap}>
      <UiComponent.Toggle
        tabs={COMPLAINT_VIEWS}
        defaultValue={activeView}
        actionFn={handleChangeTab}
        name="민원 탭 버튼"
        css={toggle}
      />
    </article>
  );
};

const wrap: CSSObject[] = [
  f.sideGutter,
  f.fullWidth,
  f.flex,
  {
    alginItems: 'center',
    justifyContent: 'flex-end',
  },
];

const toggle: CSSObject = {
  width: '56px',
  position: 'relative',
  top: '13px',
  zIndex: 100,

  '& > div': {
    borderRadius: '30px',

    '&::before': {
      borderRadius: '30px',
    },

    '& > button': {
      height: '24px',
    },
  },
};

export default ComplaintViewToggle;
