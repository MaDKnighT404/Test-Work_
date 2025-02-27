import { useSelector, useDispatch } from "react-redux";

import InputField from "../../shared/components/InputField";
import Button from "../../shared/components/Button";
import Loader from "../../shared/components/Loader";

import { useAuthForm } from "./hooks/useAuthForm";

import { RootState } from "../../store";
import { setToken } from "./store/userSlice";

import { GITHUB_HELP_URL } from "../../conts";

const AuthForm = () => {
  const githubToken = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  const { errorMessage, isLoading, handleSubmit } = useAuthForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto mt-12 flex max-w-[600px] flex-col gap-4 rounded-lg bg-white p-5 shadow-lg"
    >
      {isLoading && <Loader withBlur size="sm" />}
      <h1 className="text-center text-2xl font-bold">Authentication</h1>

      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}

      <InputField
        id="github_pat"
        label="Github API Token"
        placeholder="github_pat_11AWI******"
        type="text"
        value={githubToken}
        onChange={(e) => dispatch(setToken(e.target.value))}
      />

      <Button type="submit" variant="primary" className="mt-2">
        Login
      </Button>

      <p className="mt-2 text-center text-sm text-gray-500">
        You can know how to generate a github API token{" "}
        <a href={GITHUB_HELP_URL} target="_blank" className="text-blue-600">
          here
        </a>
        .
      </p>
    </form>
  );
};

export default AuthForm;
