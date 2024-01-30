import { useState } from "react";
import { Flex, Text } from "@ahhachul/react-components-layout";

import { KeyOf } from "~/models/common";
import { MY_ACTIVITY_TAB } from "./static/tab";
import TalkList from "../talk/lounge/List";
import ResetButton from "../shared/ResetButton";
import { useRouter } from "next/router";

function MyActivityTab() {
  const [currentTab, setCurrentTab] =
    useState<KeyOf<typeof MY_ACTIVITY_TAB>>("talks");

  const handleChangeTab = (t: KeyOf<typeof MY_ACTIVITY_TAB>) => () =>
    setCurrentTab(t);

  const router = useRouter();
  const handle더보기 = () => router.push(`/me/${currentTab}`);

  let RenderComponent = TalkList;
  switch (currentTab) {
    case "lostandfound":
      TalkList;
      break;
    case "talks":
      TalkList;
      break;
    default:
  }

  return (
    <>
      <Flex
        align="center"
        gap="16px"
        style={{
          height: "60px",
          padding: "0 20px",
        }}
      >
        {Object.entries(MY_ACTIVITY_TAB).map(([key, label]) => {
          return (
            <Flex
              key={key}
              align="center"
              justify="center"
              style={{
                height: "40px",
                boxShadow: key === currentTab ? "0 3px 1px -1px #000" : "none",
              }}
            >
              <Text
                fontSize="md"
                style={{
                  fontWeight: 600,
                  width: "max-content",
                  color: key === currentTab ? "#000" : "#9EA1AA",
                }}
                onClick={handleChangeTab(key as KeyOf<typeof MY_ACTIVITY_TAB>)}
              >
                {label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        style={{
          margin: "15px 0",
          height: "40px",
          padding: "0 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Text
          fontSize="md"
          style={{
            fontWeight: 600,
            width: "max-content",
          }}
        >
          내가 쓴 글 <b style={{ color: "#2EE477", marginLeft: "4px" }}>51</b>
        </Text>
        <ResetButton
          ItemComponent={
            <Text fontSize="sm" style={{ fontWeight: 500 }}>
              더보기
            </Text>
          }
          onClick={handle더보기}
        />
      </Flex>
      <RenderComponent />
    </>
  );
}

export default MyActivityTab;
