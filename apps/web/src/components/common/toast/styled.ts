import styled from '@emotion/styled'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { theme } from '@/styles'
import { fonts } from '@/styles/themes/foundations'

export const Toast = styled(ToastContainer)`
  width: calc(100% - 20px);
  max-width: ${theme.size.layout.width};
  bottom: 124px;

  &.Toastify__toast-container {
    padding: 0;
  }

  .Toastify__toast {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    padding: 20px;
    margin: 0;
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

  @media only screen and (max-width: 480px) {
    &.Toastify__toast-container {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`
