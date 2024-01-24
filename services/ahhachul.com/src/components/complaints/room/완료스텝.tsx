import styled from "@emotion/styled";
import { Button } from "@ahhachul/react-components-button";
import { Box, Flex } from "@ahhachul/react-components-layout";

import useModal from "~/components/shared/modal/hooks/useModal";

function 완료스텝(props: { 신청: VoidFunction }) {
  const { 신청 } = props;
  console.log("신청:", 신청);

  const { handleResetModal } = useModal();

  const 접수내역확인페이지가기 = () => {};

  const 돌아가기 = () => {
    handleResetModal();
  };

  return (
    <Box style={{ backgroundColor: "#000", width: "100vw", height: "100vh" }}>
      <ButtonGroup
        direction="column"
        align="center"
        justify="center"
        gap="16px"
      >
        <Button
          size="md"
          color="blackAlpha"
          onClick={접수내역확인페이지가기}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#EDEFF3",
          }}
        >
          접수내역 확인
        </Button>
        <Button
          size="md"
          color="whiteAlpha"
          onClick={돌아가기}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "#2EE477",
          }}
        >
          돌아가기
        </Button>
      </ButtonGroup>
    </Box>
  );
}

const ButtonGroup = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 0;
  margin: 0 20px 50px 20px;
`;

export default 완료스텝;
