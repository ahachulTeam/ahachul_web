import { type RouteObject, Navigate } from 'react-router-dom'

import { LayoutComponent } from '@/components'
import { PATH } from '@/data/path'
import { FindIdPage, FindPasswordPage, LoginPage } from '@/pages'

export const protectedRoutes: RouteObject = {
  element: <LayoutComponent.Protected />,
  children: [
    {
      children: [
        {
          path: PATH.login,
          element: <LoginPage />,
        },
        {
          path: PATH.findId,
          element: <FindIdPage />,
        },
        {
          path: PATH.findPassword,
          element: <FindPasswordPage />,
        },
        {
          path: '/',
          element: <Navigate to={PATH.login} replace />,
        },
      ],
    },
  ],
}
