// import { ActivityComponentType } from '@stackflow/react';
import { Layout } from '@/src/components/layout';
import { useDispatch } from 'react-redux';
// import { useFlow } from 'stackflow';
import { setRejectUsingBlindDate, hideNavbar, showNavbar } from '@/src/stores/blindDate';
import { loaded, loading } from '@/src/stores/ui';

const BlindDateMyPage = () => {
  // const { pop, replace } = useFlow();
  const dispatch = useDispatch();
  const clickDisableBlindDate = () => {
    dispatch(loading({ opacity: 1 }));
    // pop();
    dispatch(hideNavbar());
    setTimeout(() => {
      // replace('Home', {}, { animate: false });
    }, 750);
    setTimeout(() => {
      dispatch(loaded());
      dispatch(setRejectUsingBlindDate());
      dispatch(showNavbar());
    }, 800);
  };

  return (
    <Layout appBar={{ title: '' }} activeTab={false}>
      <main>
        <button
          css={{ color: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={clickDisableBlindDate}
        >
          소개팅 이용 안할래요
        </button>
      </main>
    </Layout>
  );
};

export default BlindDateMyPage;
