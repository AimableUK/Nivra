import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./Main/AppLayout";
import Home from "./Pages/Home/Home";
import Page404 from "./Pages/Page404/Page404";
import AboutUs from "./Pages/About/AboutUs";
import Settings from "./Pages/Settings/settings"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
