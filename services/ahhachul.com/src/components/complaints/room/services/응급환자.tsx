import { useState } from "react";

import { Flex, Text } from "@ahhachul/react-components-layout";

import ServiceBase from "./ServiceBase";
import { COMPLAINTS_CONTENTS_TYPES } from "../../types/contents";
import { COMPLAINTS_ROOM_SERVICE_INFO } from "../../static/contents";
import { CheckboxActiveSVG, CheckboxDefaultSVG } from "../icons";

function 응급환자(props: { page: COMPLAINTS_CONTENTS_TYPES }) {
  const { page } = props;

  const [isActiveSelected, setIsActiveSelected] = useState<string>();

  const handleSelect = (s: string) => () => setIsActiveSelected(s);

  return (
    <ServiceBase page={page}>
      <Flex direction="column" gap="16px" style={{ width: "100%" }}>
        {Object.entries(COMPLAINTS_ROOM_SERVICE_INFO[page].selectList).map(
          ([key]) => {
            return (
              <Flex
                key={key}
                align="center"
                gap="10px"
                style={{
                  height: "58px",
                  padding: "0 20px",
                  borderRadius: "8px",
                  background:
                    key === isActiveSelected
                      ? "linear-gradient(92deg, #2EE477 11.32%, #4BB4FF 99.85%, #50BEFD 99.85%)"
                      : "#EDEFF3",
                }}
                onClick={handleSelect(key)}
              >
                {key === isActiveSelected ? (
                  <CheckboxActiveSVG />
                ) : (
                  <CheckboxDefaultSVG />
                )}

                <Text
                  fontSize="lg"
                  style={{
                    fontWeight: 500,
                    color: key === isActiveSelected ? "#171717" : "#67696F",
                  }}
                >
                  {key}
                </Text>
              </Flex>
            );
          },
        )}
      </Flex>
    </ServiceBase>
  );
}

export default 응급환자;
