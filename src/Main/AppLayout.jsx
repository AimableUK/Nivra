import React from "react";
import { Outlet } from "react-router-dom";
import PageTitleUpdater from "../Main/PageTitleUpdater"
import Header from "../Pages/Header/Header";

const AppLayout = () => {
  return (
    <div>
      <PageTitleUpdater />
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
