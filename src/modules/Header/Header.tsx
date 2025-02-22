import Button from "../../shared/components/Button";

import { useHeader } from "./hooks/useHeader";

const Header = () => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    user,
    handleLogout,
    userIcon,
    userName,
  } = useHeader();

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
              <div className="absolute top-12 left-0 w-48 rounded-md bg-white shadow-lg">
                <Button
                  variant="ghost"
                  fullWidth
                  className="justify-start"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
