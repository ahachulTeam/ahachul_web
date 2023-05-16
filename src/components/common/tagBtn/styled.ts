import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { TagVariant } from "@/types/common";

interface TagBtnProps {
  variant: TagVariant;
}

export const TagBtn = styled.button<TagBtnProps>`
  ${({ theme, variant }) => css`
    ${variant === "primary" && theme.tag.primary};
    ${variant === "outline" && theme.tag.outline};
    ${variant === "ghost" && theme.tag.ghost};

    & > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`;
<<<<<<< HEAD

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
=======
>>>>>>> develop
