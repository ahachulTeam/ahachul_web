import React from 'react';
import { Layout } from 'components/layout';
import { title } from './style';
import useDidMount from 'hooks/useDidMount';
import { useDispatch } from 'react-redux';
import { addSnackBar } from 'stores/ui';

const RegisterCenter = () => {
  const dispatch = useDispatch();
  // const { isOpen, openModal, closeModal } = useModal();

  useDidMount(() => {
    const openSnackbar = () => {
      // openModal();
      dispatch(addSnackBar({ message: 'hello' }));
    };

    setTimeout(() => {
      openSnackbar();
    }, 1000);
  });

  return (
    <Layout
      appBar={{
        title: '센터 등록',
      }}
      activeTab={false}
    >
      <main css={{ padding: '20px' }}>
        <h1 css={title}>this is 센터 등록 page</h1>
      </main>
    </Layout>
  );
};

export default RegisterCenter;
