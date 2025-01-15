import { useNavigate, useLocation } from 'react-router-dom'

import { useAxiosPrivate } from '@/hooks'

const NAV_LIST = [
  {
    name: '홈',
    path: '/home',
  },
  {
    name: '근무 관리',
    path: '/schedule',
  },
]

function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const axiosPrivate = useAxiosPrivate()

  const onClickNavItem = (path: string) => {
    navigate(path)
  }

  const onClick = async () => {
    try {
      const response = await axiosPrivate.get('/company/info')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside>
      <ul>
        {NAV_LIST.map(item => {
          const { name, path } = item
          return (
            <li
              key={path}
              className={pathname === path ? 'active' : ''}
              onClick={() => onClickNavItem(path)}
            >
              {name}
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={onClick}>
        api request(/w Auth)
      </button>
    </aside>
  )
}

export default Navigation
