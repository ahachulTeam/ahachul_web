import { useState, useCallback } from "react";
import { Box } from "@ahhachul/react-components-layout";

import 활동AlarmCard from "./활동AlarmCard";
import 쪽지AlarmCard from "./쪽지AlarmCard";

import Header from "../../../Header";
import Toggle from "../../../Toggle";
import useModal from "../../hooks/useModal";

export type AlarmType = "Activity Notification" | "Direct Message";

const ALARM_TABS: Record<AlarmType, string> = {
  "Activity Notification": "활동알림",
  "Direct Message": "쪽지",
};

const AlarmModal = () => {
  const { handleModalClose } = useModal();

  const [tab, setTab] = useState<AlarmType>(
    Object.keys(ALARM_TABS)[0] as AlarmType,
  );
  const handleChangeTab = useCallback((t: string) => {
    setTab(t as AlarmType);
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
      <Box style={{ padding: "16px 20px" }}>
        <Toggle
          tabs={ALARM_TABS}
          defaultValue={tab as string}
          actionFn={handleChangeTab}
          name="유실물 탭 버튼"
        />
      </Box>
      <>
        {tab === "Activity Notification" ? (
          <>
            <활동AlarmCard type="talk" />
            <활동AlarmCard type="complaints" />
            <활동AlarmCard type="complaints" />
            <활동AlarmCard type="complaints" />
          </>
        ) : (
          <>
            <쪽지AlarmCard />
            <쪽지AlarmCard />
            <쪽지AlarmCard />
            <쪽지AlarmCard />
          </>
        )}
      </>
    </>
  );
};

export default AlarmModal;
