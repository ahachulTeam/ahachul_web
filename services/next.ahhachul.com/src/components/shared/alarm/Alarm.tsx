import React, { useCallback, useState } from 'react';
// import { ActivityComponentType } from '@stackflow/react';
import { Box } from '@ahhachul/react-components-layout';

// import { Layout } from '@/src/components/layout';
import { ActivityNotification } from './activityNotifications';
import { UiComponent } from '@/src/components';
import { DMList } from './directMessage';

export type AlarmType = 'activityNotification' | 'directMessage';

const ALARM_TABS: Record<AlarmType, string> = {
  activityNotification: '활동알림',
  directMessage: '채팅',
};

const Alarm = () => {
  const [tab, setTab] = useState<AlarmType>(Object.keys(ALARM_TABS)[0] as AlarmType);
  const handleChangeTab = useCallback((t: string) => {
    setTab(t as AlarmType);
  }, []);

  return (
    // <Layout
    //   appBar={{
    //     title: '알림',
    //   }}
    //   activeTab={false}
    // >
    <Box as="main" css={{ padding: '14px 0' }}>
      <UiComponent.Toggle
        tabs={ALARM_TABS}
        defaultValue={tab as string}
        actionFn={handleChangeTab}
        name="유실물 탭 버튼"
        css={{ padding: '0 20px 20px' }}
      />
      <>
        {tab === 'activityNotification' ? (
          <ul>
            <ActivityNotification type="talk" />
            <ActivityNotification type="complaints" />
            <ActivityNotification type="complaints" />
            <ActivityNotification type="talk" />
            <ActivityNotification type="talk" />
            <ActivityNotification type="complaints" />
            <ActivityNotification type="talk" />
            <ActivityNotification type="talk" />
            <ActivityNotification type="complaints" />
            <ActivityNotification type="complaints" />
            <ActivityNotification type="talk" />
          </ul>
        ) : (
          <DMList />
        )}
      </>
    </Box>
    // </Layout>
  );
};

export default Alarm;
