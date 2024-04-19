import React from 'react';
import { title } from './style';

const Dashboard = () => {
  return (
    <section css={{ padding: '20px' }}>
      <h1 css={title}>this is Dashboard page (after user loggedin)</h1>
    </section>
  );
};

export default Dashboard;
