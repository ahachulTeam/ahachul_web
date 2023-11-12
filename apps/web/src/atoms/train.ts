import { atom } from 'recoil'
import { v1 } from 'uuid'
import { Stations } from '@/types'

export const subwayStationsAtom = atom<Stations>({
  key: `global/subwayStations/${v1()}`,
  default: {},
})
