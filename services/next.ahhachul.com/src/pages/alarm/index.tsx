import React, { useCallback, useState } from 'react';
import { Box } from '@ahhachul/react-components-layout';

import { Layout } from '@/src/components/layout';
import { UiComponent, AlarmComponent } from '@/src/components';

export type AlarmType = 'activityNotification' | 'directMessage';

const ALARM_TABS: Record<AlarmType, string> = {
  activityNotification: '활동알림',
  directMessage: '채팅',
};

function Alarm() {
  const [tab, setTab] = useState<AlarmType>(
    Object.keys(ALARM_TABS)[0] as AlarmType,
  );
  const handleChangeTab = useCallback((t: string) => {
    setTab(t as AlarmType);
  }, []);

  return (
    <Layout headerType="back" title="알림" nav={false}>
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
              <AlarmComponent.ActivityNotification type="talk" />
              <AlarmComponent.ActivityNotification type="complaints" />
              <AlarmComponent.ActivityNotification type="complaints" />
              <AlarmComponent.ActivityNotification type="talk" />
              <AlarmComponent.ActivityNotification type="talk" />
              <AlarmComponent.ActivityNotification type="complaints" />
              <AlarmComponent.ActivityNotification type="talk" />
              <AlarmComponent.ActivityNotification type="talk" />
              <AlarmComponent.ActivityNotification type="complaints" />
              <AlarmComponent.ActivityNotification type="complaints" />
              <AlarmComponent.ActivityNotification type="talk" />
            </ul>
          ) : (
            <AlarmComponent.DMList />
          )}
        </>
      </Box>
    </Layout>
  );
}

export default Alarm;
