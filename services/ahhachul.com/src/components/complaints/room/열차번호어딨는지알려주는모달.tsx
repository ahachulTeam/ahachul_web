import { Flex } from "@ahhachul/react-components-layout";

import BottomSheet from "~/components/shared/bottomSheet/BottomSheet";

interface 열차번호어딨는지알려주는모달Props {
  isShowing: boolean;
  onClose: VoidFunction;
}

function 열차번호어딨는지알려주는모달({
  isShowing,
  onClose,
}: 열차번호어딨는지알려주는모달Props) {
  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <Flex as="section" direction="column" style={{ width: "100%" }}>
        열차번호어딨는지알려주는모달
      </Flex>
    </BottomSheet>
  );
}

export default 열차번호어딨는지알려주는모달;
