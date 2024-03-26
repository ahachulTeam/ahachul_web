import { Layout } from 'components/layout';
import React from 'react';
// import MapSvg from './MapSvg';

const SubwayMap = () => {
  return (
    <Layout
      appBar={{
        title: '나만의 역 등록',
      }}
      activeTab={false}
    >
      <main
        css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          top: '-58px',
        }}
      >
        {/* LICENSE:https://github.com/Sinseiki/opensource-seoul-subway-map/blob/master/mapimage.svg?short_path=aad1e39 */}
        {/* <MapSvg css={{ width: '100%', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} /> */}
      </main>
    </Layout>
  );
};

export default SubwayMap;
