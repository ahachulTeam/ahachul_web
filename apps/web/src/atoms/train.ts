import { atom } from 'recoil'
import { v1 } from 'uuid'
import { StationsClientModel } from '@/types'

export const subwayStationsAtom = atom<StationsClientModel>({
  key: `global/subwayStations/${v1()}`,
  default: {},
})
