import { Outlet } from "react-router-dom";
import Header from "../../modules/Header/Header";

const MainLayout = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-auto bg-blue-500">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
