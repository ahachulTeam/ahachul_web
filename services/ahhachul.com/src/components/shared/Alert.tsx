import { vars } from "@ahhachul/themes";
import styled from "@emotion/styled";

import Dimmed from "./Dimmed";
import { Button } from "@ahhachul/react-components-button";
import { Text, Flex } from "@ahhachul/react-components-layout";

interface AlertProps {
  open?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick: () => void;
}

function Alert({
  open,
  title,
  description,
  buttonLabel = "확인",
  onButtonClick,
}: AlertProps) {
  if (open === false) {
    return null;
  }

  return (
    <Dimmed>
      <AlertContainer>
        <Text fontSize="md" style={{ marginBottom: 6 }}>
          {title}
        </Text>
        {description ? <Text fontSize="sm">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            variant="ghost"
            onClick={onButtonClick}
            style={{ marginTop: 12 }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  );
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${vars.colors.$static.dark.color.white};
  border-radius: 8px;
  overflow: hidden;
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
  z-index: var(--z-indexes-alert);
`;

export default Alert;
