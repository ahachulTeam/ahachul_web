import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import Dimmed from "~/components/shared/Dimmed";
import AnimatePortal from "~/components/shared/portal/AnimatePortal";
import { MODAL_PRESET_SLUGS, MODAL_SLUG } from "~/constants/modal";
import { modalCompoState } from "~/stores/common";
import SearchModal from "./contents/Search";
import useDidMount from "~/hooks/lifeCycle/useDidMount";

const Modal = () => {
  const router = useRouter();
  const [ModalComponent, setModalCompo] = useRecoilState(modalCompoState);

  useDidMount(() => {
    const slug = router.query?.[MODAL_SLUG];

    if (slug) {
      switch (slug) {
        case MODAL_PRESET_SLUGS.search:
          setModalCompo([<SearchModal key={slug} />]);
          break;
        default:
      }
    }
  });

  return (
    <AnimatePortal isShowing={ModalComponent.length > 0} mode="sync">
      {ModalComponent?.map((compo, idx) => (
        <Dimmed key={idx} backColor="unset" depth={idx + 1}>
          {compo}
        </Dimmed>
      ))}
    </AnimatePortal>
  );
};

export default Modal;
