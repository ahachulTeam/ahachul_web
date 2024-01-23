import styled from "@emotion/styled";

interface SpacingProps {
  size: number;
  direction?: "vertical" | "horizontal";
  backgroundColor?: string;
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = "vertical" }) =>
    direction === "vertical"
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
`;

export default Spacing;
