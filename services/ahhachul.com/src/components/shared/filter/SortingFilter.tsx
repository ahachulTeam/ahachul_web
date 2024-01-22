import BottomSheet from "../bottomSheet/BottomSheet";

interface SortingFilterProps {
  isShowing: boolean;
  onClose: VoidFunction;
  handleApplyFilter: (key: string) => (value: string) => void;
}

function SortingFilter(props: SortingFilterProps) {
  const { isShowing, onClose } = props;

  return (
    <BottomSheet isShowing={isShowing} onClickOutside={onClose}>
      <div>SortingFilter</div>
    </BottomSheet>
  );
}

export default SortingFilter;
