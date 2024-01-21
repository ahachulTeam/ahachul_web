import styled from "@emotion/styled";

interface ResetButtonProps {
  ItemComponent: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function ResetButton(props: ResetButtonProps) {
  const { ItemComponent, onClick, disabled } = props;
  return (
    <UnSetButton disabled={disabled} onClick={onClick}>
      {ItemComponent}
    </UnSetButton>
  );
}

const UnSetButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export default ResetButton;
