import { atom, useRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'

const sampleAtom = atom({
  key: `sampleAtom/${uuid()}`,
  default: 'sampleAtom',
})

export const useSampleAtom = () => {
  const [sample, setSample] = useRecoilState(sampleAtom)

  return { sample, setSample }
}
