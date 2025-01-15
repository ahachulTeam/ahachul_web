import { useRoutes } from 'react-router-dom'

import { privateRoutes } from './routes/private'
import { protectedRoutes } from './routes/protected'

function Router() {
  const routes = useRoutes([protectedRoutes, privateRoutes])

  return routes
}

export default Router
