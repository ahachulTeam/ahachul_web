import { Flex, Text } from "@ahhachul/react-components-layout";
import ResetButton from "../shared/ResetButton";

function ComplaintsCard() {
  return (
    <Flex
      direction="column"
      gap="12px"
      style={{ padding: "24px 20px", borderBottom: "1px solid #F5F5F5" }}
    >
      <Flex align="center" gap="8px">
        <Text
          fontSize="sm"
          style={{
            fontWeight: 500,
            height: "30px",
            width: "30px",
            background: "#01A13F",
            borderRadius: "50%",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          2
        </Text>
        <Text fontSize="sm" style={{ color: "#67696F" }}>
          09/23 (토) 오후 7:00
        </Text>
        <Text fontSize="sm" style={{ color: "#171717", fontWeight: 600 }}>
          접수완료
        </Text>
      </Flex>
      <Flex direction="column" gap="30px" style={{ paddingLeft: "24px" }}>
        <Flex
          direction="column"
          gap="6px"
          style={{
            padding: "16px",
            background: "#242424",
            borderRadius: "6px",
            position: "relative",
          }}
        >
          <Text fontSize="sm" style={{ color: "#fff", fontWeight: 600 }}>
            안내방송
          </Text>
          <Text fontSize="sm" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
            시끄러워요 · 임산부 배려석
          </Text>
          <Text
            fontSize="sm"
            style={{
              fontWeight: 600,
              height: "40px",
              width: "40px",
              background: "#01A13F",
              borderRadius: "50%",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
            }}
          >
            2
          </Text>
        </Flex>
        <ResetButton
          ItemComponent={
            <Text
              fontSize="sm"
              style={{
                fontWeight: 600,
                color: "#171717",
                width: "100%",
                textAlign: "right",
              }}
            >
              민원 재접수
            </Text>
          }
          onClick={() => {}}
        />
      </Flex>
    </Flex>
  );
}

export default ComplaintsCard;
