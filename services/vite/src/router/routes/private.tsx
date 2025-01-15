import type { RouteObject } from 'react-router-dom'

import HomeRoutes from 'home/HomeRoutes'
import ScheduleRoutes from 'schedule/ScheduleRoutes'

import { LayoutComponent } from '@/components'
import { PATH } from '@/data/path'

export const privateRoutes: RouteObject = {
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: PATH.home,
          element: <HomeRoutes />,
        },
        {
          path: PATH.schedule,
          element: <ScheduleRoutes />,
        },
      ],
    },
  ],
}
