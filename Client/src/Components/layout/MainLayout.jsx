import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;