import { useState, useCallback } from "react";
import { Box } from "@ahhachul/react-components-layout";

import Header from "../../Header";
import Toggle from "../../Toggle";

import useModal from "../hooks/useModal";

export type AlarmType = "Activity Notification" | "Direct Message";

const ALARM_TABS: Record<AlarmType, string> = {
  "Activity Notification": "활동알림",
  "Direct Message": "쪽지",
};

const AlarmModal = () => {
  const { handleModalClose } = useModal();

  const [tab, setTab] = useState(Object.keys(ALARM_TABS)[0]);
  const handleChangeTab = useCallback((t: string) => {
    setTab(t);
  }, []);

  return (
    <>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={handleModalClose}
          />
        }
        centerTitle="알림"
      />
      <Box style={{ padding: "15px 20px" }}>
        <Toggle
          tabs={ALARM_TABS}
          defaultValue={tab as string}
          actionFn={handleChangeTab}
          name="유실물 탭 버튼"
        />
      </Box>
    </>
  );
};

export default AlarmModal;
