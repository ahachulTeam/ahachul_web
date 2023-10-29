import { atom, useRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'

export type ViewStatusType = 'list' | 'grid'

const viewAtom = atom<ViewStatusType>({
  key: `viewAtom/${uuid()}`,
  default: 'grid',
})

export const useViewAtom = () => {
  const [view, setView] = useRecoilState(viewAtom)

  const handleChangeListView = () => {
    setView('list')
  }

  const handleChangeGridView = () => {
    setView('grid')
  }

  return { view, handleChangeListView, handleChangeGridView }
}
