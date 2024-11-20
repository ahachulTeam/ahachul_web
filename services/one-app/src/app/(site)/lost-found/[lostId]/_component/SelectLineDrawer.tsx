import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

const SelectLineDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>호선을 선택해주세요.</DrawerTrigger>
      <DrawerContent className="w-full bg-gray-50">
        <div className="mx-auto w-full max-w-sm bg-gray-20">
          <DrawerHeader>
            <DrawerTitle>호선 변경</DrawerTitle>
            <DrawerDescription>
              소식이 궁금한 호선을 선택해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="font-semibold px-[153.5px] py-[15px] bg-[#2ACF6C] rounded-lg">
                완료
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectLineDrawer;
