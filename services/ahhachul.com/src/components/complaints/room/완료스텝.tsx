import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Button } from "@ahhachul/react-components-button";
import { Box, Flex, Text } from "@ahhachul/react-components-layout";

import LoadingModal from "~/components/shared/FullPageLoading";
import useModal from "~/components/shared/modal/hooks/useModal";
import { defaultFadeInVariants } from "~/constants/motions";

function 완료스텝(props: { 신청: VoidFunction }) {
  const { 신청 } = props;
  console.log("신청:", 신청);

  const { handleResetModal } = useModal();

  const 접수내역확인페이지가기 = () => {};

  const 돌아가기 = () => {
    handleResetModal();
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  return (
    <>
      <LoadingModal show={isLoading} variants={defaultFadeInVariants} />
      <Box
        style={{
          backgroundColor: "#000",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        {!isLoading && (
          <Flex
            direction="column"
            gap="30px"
            align="center"
            justify="center"
            style={{
              position: "absolute",
              top: "140px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            <video
              autoPlay
              loop
              muted
              style={{ width: "auto", height: "184px" }}
            >
              <source src="/videos/process-complete.mp4" />
            </video>
            <Text
              fontSize="2xl"
              style={{ color: "#fff", fontWeight: 600, width: "100%" }}
            >
              민원이 접수되었어요!
            </Text>
          </Flex>
        )}
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
    </>
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
