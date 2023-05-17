import { atom, useRecoilState } from "recoil";

export type View = "list" | "grid";

const viewAtom = atom<View>({
  key: "viewAtom",
  default: "grid",
});

export const useViewAtom = () => {
  const [view, setView] = useRecoilState(viewAtom);

  const handleChangeListView = () => {
    setView("list");
  };

  const handleChangeGridView = () => {
    setView("grid");
  };

  return { view, handleChangeListView, handleChangeGridView };
};
