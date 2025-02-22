import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUserRepo } from "../api/createUserRepo";
import { updateUserRepo } from "../api/updateUserRepo";
import { deleteUserRepo } from "../api/deleteUserRepo";

import type { RootState } from "../../../store";

interface FormData {
  name: string;
  description: string;
  visibility: string;
}

interface UseRepositoryFormProps {
  mode: "create" | "edit";
  initialData?: FormData;
  closeModal: () => void;
}

export const useRepositoryForm = ({
  mode,
  initialData,
  closeModal,
}: UseRepositoryFormProps) => {
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.data);
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    visibility: initialData?.visibility || "public",
  });

  const handleSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["repos"] });
    closeModal();
  };

  const handleError = (error: Error) => {
    setErrorMessage(error.message);
  };

  const createRepoMutation = useMutation({
    mutationFn: () => createUserRepo(token, formData),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateRepoMutation = useMutation({
    mutationFn: () => updateUserRepo(token, formData, user?.login || ""),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const deleteRepoMutation = useMutation({
    mutationFn: () => deleteUserRepo(token, formData, user?.login || ""),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "create") {
      if (!/^[a-zA-Z0-9_-]+$/.test(formData.name)) {
        setErrorMessage(
          "Repository name can only contain english letters, numbers, hyphens (-) and underscores (_)",
        );
        return;
      }
    }

    if (mode === "create") {
      createRepoMutation.mutate();
    } else {
      updateRepoMutation.mutate();
    }
  };

  const handleDelete = () => {
    deleteRepoMutation.mutate();
  };

  const isPending =
    createRepoMutation.isPending ||
    updateRepoMutation.isPending ||
    deleteRepoMutation.isPending;

  return {
    formData,
    errorMessage,
    isPending,
    handleChange,
    handleSubmit,
    handleDelete,
    buttonText: mode === "create" ? "Create repository" : "Update repository",
    loadingText: mode === "create" ? "Creating..." : "Updating...",
  };
};
