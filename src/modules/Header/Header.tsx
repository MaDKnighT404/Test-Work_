import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearUser } from "../AuthForm/store/userSlice";

import { RootState } from "../../store";

const Header = () => {
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

  return (
    <header className="h-20 rounded-b-2xl bg-gray-100 px-12 py-4 shadow">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <img src="./logo.webp" alt="logo" className="w-[100px] min-w-[100px]" />
        {user.data && (
          <div
            className="relative flex cursor-pointer items-center gap-4"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span className="text-sm font-semibold">{userName}</span>
            <img
              src={userIcon}
              alt="user photo"
              className="h-12 rounded-full"
            />
            {isDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 rounded-md bg-white text-gray-700 shadow-lg hover:bg-gray-100 hover:text-blue-600">
                <button
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm"
                  onClick={() => handleLogout()}
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
