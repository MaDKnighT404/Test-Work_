import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearUser } from "../../AuthForm/store/userSlice";

export const useHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const userIcon = user?.data?.avatar_url ?? "./user_icon.svg";
  const userName = user?.data?.name ?? user?.data?.login;

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    user,
    handleLogout,
    userIcon,
    userName,
  };
};
