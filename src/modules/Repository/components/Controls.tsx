import Form from "./Form";

import Modal from "../../../shared/components/Modal";
import Button from "../../../shared/components/Button";

import useModal from "../../../shared/hooks/useModal";

const Controls = ({ isDisabled }: { isDisabled: boolean }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openModal} disabled={isDisabled} variant="icon">
          <img src="/plus.svg" alt="plus" className="h-6 w-6 text-amber-600" />
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create new repository
        </h2>
        <Form closeModal={closeModal} mode="create" />
      </Modal>
    </>
  );
};

export default Controls;
