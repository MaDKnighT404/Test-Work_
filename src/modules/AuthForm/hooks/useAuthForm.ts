import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserInfo } from "../api/getUserInfo";
import { setUser, setToken } from "../store/userSlice";

export const useAuthForm = () => {
  const [githubToken, setGithubToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userData = await getUserInfo(githubToken);
      dispatch(setToken(githubToken));
      dispatch(setUser(userData));
      navigate("/main");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    githubToken,
    errorMessage,
    isLoading,
    setGithubToken,
    handleSubmit,
  };
};
