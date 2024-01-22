import { useRecoilValue } from "recoil";

import Dimmed from "~/components/shared/Dimmed";
import AnimatePortal from "~/components/shared/portal/AnimatePortal";
import { modalCompoState } from "~/stores/common";

const Modal = () => {
  const ModalComponent = useRecoilValue(modalCompoState);

  return (
    <AnimatePortal isShowing={ModalComponent.length > 0}>
      {ModalComponent?.map((compo, idx) => <Dimmed key={idx}>{compo}</Dimmed>)}
    </AnimatePortal>
  );
};

export default Modal;
