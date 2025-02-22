import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Repository from "../modules/Repository/Repository";

import { RootState } from "../store";

const MainPage = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto w-full max-w-[1200px] p-5">
      <Repository />
    </div>
  );
};

export default MainPage;
