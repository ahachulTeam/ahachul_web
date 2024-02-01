import { Flex, Box, Text } from "@ahhachul/react-components-layout";
import { 인기분실물_FILTER_LIST } from "./static/filter";
import ResetButton from "~/components/shared/ResetButton";
import { useCallback } from "react";
import { 인기분실물_FILTER_TYPES } from "./types/filter";
import Image from "next/image";

function 인기분실물Filter() {
  const handle인기분실물 = useCallback(
    (key: 인기분실물_FILTER_TYPES) => () => {
      console.log("key :", key);
    },
    [],
  );

  return (
    <Flex direction="column" gap="20px" style={{ padding: "16px 20px" }}>
      <Text fontSize="md" style={{ fontWeight: "600" }}>
        인기 분실물 TOP 4
      </Text>
      <Flex align="center" gap="16px">
        {Object.entries(인기분실물_FILTER_LIST).map(([key, value]) => {
          return (
            <ResetButton
              key={key}
              ItemComponent={
                <Flex direction="column" align="center" gap="8px">
                  <Box
                    style={{
                      width: "58px",
                      height: "58px",
                      position: "relative",
                      borderRadius: "50%",
                      border: "1px solid #EDEFF3",
                    }}
                  >
                    <Image
                      alt=""
                      src={`/${key}.png`}
                      fill
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Text fontSize="xs">{value}</Text>
                </Flex>
              }
              onClick={handle인기분실물(key as 인기분실물_FILTER_TYPES)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

export default 인기분실물Filter;
