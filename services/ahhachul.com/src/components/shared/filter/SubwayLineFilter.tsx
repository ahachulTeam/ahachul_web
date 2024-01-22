import BottomSheet from "../bottomSheet/BottomSheet";

interface SubwayLineFilterProps {
  isShowing: boolean;
  onClose: VoidFunction;
  handleApplyFilter: (key: string) => (value: string) => void;
}

function SubwayLineFilter(props: SubwayLineFilterProps) {
  const { isShowing, onClose } = props;

  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <div>SubwayLineFilter</div>
    </BottomSheet>
  );
}

export default SubwayLineFilter;
