import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserInfo } from "../api/getUserInfo";

import { setUser, setToken } from "../store/userSlice";

import type { RootState } from "../../../store";

export const useAuthForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const githubToken = useSelector((state: RootState) => state.user.token);

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
    errorMessage,
    isLoading,
    handleSubmit,
  };
};
