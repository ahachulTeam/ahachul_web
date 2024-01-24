import { Flex } from "@ahhachul/react-components-layout";

import useModal from "~/components/shared/modal/hooks/useModal";

import 열차번호여부스텝 from "../room/열차번호여부스텝";

function ComplaintOverviewList() {
  const { handleModalOpen } = useModal();

  const open열차번호여부스텝 = () => {
    handleModalOpen(<열차번호여부스텝 slug={"온도조절"} />)();
  };

  return (
    <Flex
      as="main"
      onClick={open열차번호여부스텝}
      justify={"center"}
      align={"center"}
      style={{ width: "100vw", height: "calc(100vh - 48px)" }}
    >
      open
    </Flex>
  );
}

export default ComplaintOverviewList;
