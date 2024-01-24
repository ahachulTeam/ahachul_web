import Header from "../../Header";
import useModal from "../hooks/useModal";

const ServiceModal = () => {
  const { handleModalClose } = useModal();

  return (
    <>
      <Header
        left={
          <Header.HeaderLeft
            contentsType="go-back"
            onClick={handleModalClose}
          />
        }
        centerTitle="전체 서비스"
      />
      hello ? this is service 화면
    </>
  );
};

export default ServiceModal;
