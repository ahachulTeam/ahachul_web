import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { createPortal } from "react-dom";
import { vars } from "@ahhachul/themes";

import { Button } from "@ahhachul/react-components-button";
import { useEffect, useState } from "react";
import { Flex } from "@ahhachul/react-components-layout";

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  const $portal_root = isMounted
    ? document.getElementById("root-portal")
    : null;

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
  }, [isMounted]);

  if ($portal_root == null) {
    return null;
  }

  return $portal_root
    ? createPortal(
        <Container align="center" justify="center">
          <Button
            size="sm"
            color="whiteAlpha"
            disabled={disabled}
            onClick={onClick}
            style={{ backgroundColor: "inherit" }}
          >
            {label}
          </Button>
        </Container>,
        $portal_root,
      )
    : null;
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`;

const Container = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background-color: ${vars.colors.$static.dark.color.black};
  padding: 15px 10px;
  margin: 0 20px 35px 20px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`;

export default FixedBottomButton;
