import styled from "@emotion/styled";
import { Button } from "@ahhachul/react-components-button";

import Header from "~/components/shared/Header";
import useModal from "~/components/shared/modal/hooks/useModal";
import { vars } from "@ahhachul/themes";
import { Flex } from "@ahhachul/react-components-layout";
import 완료스텝 from "./완료스텝";

function 신고유형선택스텝() {
  const { handleModalOpen, handleModalClose } = useModal();

  const 신청을문자로하기 = () => {};

  const 신고유형선택완료_완료스텝으로가기 = () => {
    handleModalOpen(<완료스텝 신청={신청을문자로하기} />)();
  };

  return (
    <>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={handleModalClose}
          />
        }
        centerTitle="온도조절"
      />
      <ButtonWrap align="center" justify="center">
        <Button
          size="md"
          color="whiteAlpha"
          onClick={신고유형선택완료_완료스텝으로가기}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "48px",
            borderRadius: "8px",
            backgroundColor: vars.colors.$static.dark.color.black,
          }}
        >
          다음
        </Button>
      </ButtonWrap>
    </>
  );
}

const ButtonWrap = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 0;
  margin: 0 20px 30px 20px;
`;

export default 신고유형선택스텝;
