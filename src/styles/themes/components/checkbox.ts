import { a11y, colors, fonts } from "../foundations";
import { css } from "styled-components";

export const checkbox = {
  primary: css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    border: 1px solid ${colors.gray_30};
    border-radius: 110px;
    padding: 0 16px;
    transition: border 0.3s ease-in-out;
    cursor: pointer;

    & > input[type="checkbox"] {
      ${a11y.visuallyHidden};
    }

    & > label {
      ${fonts.medium16};
      display: flex;
      align-items: center;
      column-gap: 12px;
      min-width: 100%;
      min-height: 100%;
      color: ${colors.gray_80};
      user-select: none;

      &::before {
        content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
        vertical-algin: center;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid ${colors.gray_30};
        background-color: ${colors.gray_30};
        font-size: 2.1rem;
        transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
      }

      & > span {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      @media (hover: hover) {
        &:hover::before {
          border-color: ${colors.primary_hover};
        }
      }
    }

    & > input[type="checkbox"]:checked + label {
      &::before {
        content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
        vertical-algin: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${colors.primary};
        border-radius: 50%;
        font-size: 2.1rem;
        background-color: ${colors.primary};
      }
    }
  `,
} as const;

export type CheckboxType = typeof checkbox;
