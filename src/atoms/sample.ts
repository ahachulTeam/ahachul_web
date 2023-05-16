import { atom, useRecoilState } from "recoil";

const sampleAtom = atom({
  key: "sampleAtom",
  default: "sampleAtom",
});

export const useSampleAtom = () => {
  const [sample, setSample] = useRecoilState(sampleAtom);

  return { sample, setSample };
};
