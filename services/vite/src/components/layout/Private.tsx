import { Outlet, Navigate } from 'react-router-dom'

import { css } from '@emotion/react'
import { useShallow } from 'zustand/shallow'

import { UiComponent } from '@/components'
import { useAuthStore } from '@/stores/auth'

function Private() {
  const { auth } = useAuthStore(
    useShallow(state => ({
      auth: state.auth,
    })),
  )

  if (auth?.accessToken) {
    return (
      <div css={privateLayout}>
        <UiComponent.Header />
        <UiComponent.Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  return <Navigate to={'/'} />
}

const privateLayout = css`
  header {
    position: fixed;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: cadetblue;
    padding: 0 2rem;
  }

  aside {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100%;
    width: 20%;
    color: black;
    background-color: antiquewhite;
    font-size: 18px;
    font-weight: 700;
  }

  aside ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 100px;
  }

  aside ul li {
    cursor: pointer;
  }

  main {
    position: absolute;
    top: 60px;
    left: 20%;
    max-height: calc(100% - 60px);
    max-width: calc(100% - 20%);
    padding: 2rem;
  }

  button {
    border: none;
    outline: none;
    background-color: aquamarine;
  }
`

export default Private
