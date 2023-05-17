import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { ButtonSize, ButtonVariant } from "./Button";

interface ButtonProps {
  size: ButtonSize;
  variant: ButtonVariant;
}

export const Button = styled.button<ButtonProps>`
  ${({ theme, size, variant }) => css`
    ${size === "xs" && theme.button.size.xs}
    ${size === "sm" && theme.button.size.sm};
    ${size === "smd" && theme.button.size.smd};
    ${size === "md" && theme.button.size.md};
    ${size === "lg" && theme.button.size.lg};
    ${variant === "primary" && theme.button.variant.primary};
    ${variant === "secondary" && theme.button.variant.secondary};
  `}
`;
