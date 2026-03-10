import { type ActivityComponentType } from '@stackflow/react';

import { SeoulMetroMapViewer } from '@ahhachul/ui';

import { LayoutComponent } from '@/components';
import { useFetchSubwayLinesRaw } from '@/services/subway';

const SubwayMapPage: ActivityComponentType = () => {
  const subwayLineCatalogQuery = useFetchSubwayLinesRaw();

  return (
    <LayoutComponent.Base navigationSlot={false} backgroundColor="#FFFFFF">
      <div
        style={{
          minHeight: '100dvh',
          background: '#FFFFFF',
        }}
      >
        <SeoulMetroMapViewer subwayLines={subwayLineCatalogQuery.data?.subwayLines ?? []} />
      </div>
    </LayoutComponent.Base>
  );
};

export default SubwayMapPage;
