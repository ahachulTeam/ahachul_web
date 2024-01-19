import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { vars } from "@ahhachul/themes";

const opacity = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
`;

const Skeleton = styled.div<{
  width: string | number;
  height: string | number;
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: vars.colors.$scale.gray[100],
  animation: `${opacity} 2s ease-in-out 0.5s infinite`,
}));

export default Skeleton;
