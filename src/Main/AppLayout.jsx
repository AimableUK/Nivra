import React from "react";
import { Outlet } from "react-router-dom";
import PageTitleUpdater from "../Main/PageTitleUpdater"

const AppLayout = () => {
  return (
    <div>
      <PageTitleUpdater />
      <Outlet />
    </div>
  );
};

export default AppLayout;
