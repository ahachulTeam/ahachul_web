import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { theme } from "@/styles";
import { fonts } from "@/styles/themes/foundations";

export const Toast = styled(ToastContainer)`
  .Toastify__toast {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 360px;
    height: 60px;
    padding: 20px;
    border-radius: 20px;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.secondary};
  }

  .Toastify__toast-body {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    white-space: pre-line;

    ${fonts.regular16}

    b, strong {
      ${fonts.bold16}
    }
  }

  &.Toastify__toast-container--top-center {
    top: 20px;
  }
`;
