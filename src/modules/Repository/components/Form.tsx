import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";

import { useRepositoryForm } from "../hooks/useRepositoryForm";

const Form = ({
  closeModal,
  mode = "create",
  initialData,
}: {
  closeModal: () => void;
  mode: "create" | "edit";
  initialData?: {
    name: string;
    description: string;
    visibility: string;
  };
}) => {
  const {
    formData,
    errorMessage,
    isPending,
    handleChange,
    handleSubmit,
    handleDelete,
    buttonText,
    loadingText,
  } = useRepositoryForm({ mode, initialData, closeModal });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isPending && <Loader withBlur size="lg" />}
      {errorMessage && (
        <p className="te truncate rounded-lg bg-red-50 p-4 text-sm text-wrap text-red-500">
          {errorMessage}
        </p>
      )}

      {mode === "create" && (
        <InputField
          id="name"
          label="Repository name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      <InputField
        id="description"
        label="Description (optional)"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
      />
      <InputField
        id="visibility"
        label="Visibility"
        type="select"
        value={formData.visibility}
        onChange={handleChange}
        options={[
          { label: "Public", value: "public" },
          { label: "Private", value: "private" },
        ]}
      />

      <div className="mt-6 flex justify-end gap-6">
        <Button
          type="button"
          onClick={closeModal}
          disabled={isPending}
          variant="ghost"
        >
          Cancel
        </Button>
        {mode === "edit" && (
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            variant="danger"
          >
            Delete
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="bg-green-600 active:bg-green-700"
        >
          {isPending ? loadingText : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
