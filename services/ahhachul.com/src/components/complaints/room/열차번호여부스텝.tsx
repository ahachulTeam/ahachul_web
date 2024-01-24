import styled from "@emotion/styled";
import { Button } from "@ahhachul/react-components-button";
import { Box, Flex, Heading } from "@ahhachul/react-components-layout";

import Header from "~/components/shared/Header";
import useModal from "~/components/shared/modal/hooks/useModal";
import { vars } from "@ahhachul/themes";
import 신고유형선택스텝 from "./신고유형선택스텝";
import useBoolean from "~/hooks/common/useBoolean";
import dynamic from "next/dynamic";

const ModalComponent = dynamic(
  () => import("~/components/shared/filter/SortingFilter"),
  { ssr: false },
);

function 열차번호여부스텝({ slug }: { slug: string }) {
  console.log("slug", slug);
  const { handleModalOpen, handleModalClose } = useModal();

  const 신고유형선택으로가기 = () => {
    handleModalOpen(<신고유형선택스텝 />)();
  };

  const [isModalShowing, , openHandler, closeHandler] = useBoolean(false);

  const handleApplyFilter = (key: string) => (value: string) => {
    console.log(key, value);
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
        centerTitle={slug}
      />
      <Box style={{ padding: "20px" }}>
        <Flex direction="column" gap="6px" style={{ marginBottom: "50px" }}>
          <Heading fontSize="md">정확한 민원접수를 위해</Heading>
          <Heading fontSize="md">
            <b style={{ color: "#2EE477" }}>열차번호</b>를 입력해주세요
          </Heading>
        </Flex>
      </Box>
      <ButtonGroup
        direction="column"
        align="center"
        justify="center"
        gap="32px"
      >
        <Button
          size="md"
          color="whiteAlpha"
          onClick={신고유형선택으로가기}
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
        <Button
          variant="ghost"
          size="sm"
          color="blackAlpha"
          onClick={openHandler}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "max-content",
            backgroundColor: vars.colors.$static.dark.color.white,
          }}
        >
          열차번호 없이 민원신고 하기
        </Button>
      </ButtonGroup>
      <ModalComponent
        isShowing={isModalShowing}
        onClose={closeHandler}
        handleApplyFilter={handleApplyFilter}
      />
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
  margin: 0 20px 58px 20px;
`;

export default 열차번호여부스텝;
