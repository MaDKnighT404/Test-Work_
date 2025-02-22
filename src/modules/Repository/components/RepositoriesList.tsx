import { useState } from "react";

import Form from "./Form";
import RepositoryItem from "./RepositoryItem";

import Loader from "../../../shared/components/Loader";
import useModal from "../../../shared/hooks/useModal";
import Modal from "../../../shared/components/Modal";

import type { Repository } from "../types";

const RepositoriesList = ({
  repositories,
  isDisabled,
}: {
  repositories: Repository[] | undefined;
  isDisabled: boolean;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [activeRepoId, setActiveRepoId] = useState<number | null>(null);

  const activeRepo = repositories?.find((repo) => repo.id === activeRepoId);
  const initialData = activeRepo
    ? {
        name: activeRepo.name,
        description: activeRepo.description || "",
        visibility: activeRepo.visibility || "public",
      }
    : undefined;

  const handleOpenModal = (id: number) => {
    setActiveRepoId(id);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setActiveRepoId(null);
  };

  if (repositories) {
    return (
      <>
        <ul className="relative my-6 flex flex-col gap-4">
          {isDisabled && <Loader withBlur size="sm" />}
          {repositories.map((repo: Repository) => (
            <RepositoryItem
              key={repo.id}
              repo={repo}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </ul>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Edit {activeRepo?.name} repository
          </h2>
          <Form
            closeModal={handleCloseModal}
            initialData={initialData}
            mode="edit"
          />
        </Modal>
      </>
    );
  }
};

export default RepositoriesList;
