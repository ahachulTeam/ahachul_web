import React from 'react';
import { Flex } from '@ahhachul/react-components-layout';

import ServiceBase from './ServiceBase';
import { COMPLAINTS_CONTENTS_TYPES } from 'data/complaints';

function 환경민원(props: { page: COMPLAINTS_CONTENTS_TYPES }) {
  const { page } = props;

  return (
    <ServiceBase page={page}>
      <Flex align="center" style={{ width: '100%' }}></Flex>
    </ServiceBase>
  );
}

export default 환경민원;
