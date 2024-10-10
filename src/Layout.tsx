import React from "react";
import { Outlet } from "react-router";
import Header from "./components/elements/header";

export const Layout = () => {
  return (
    <div className="bg-background w-screen h-screen">
      <Header />
      <div className="h-[calc(100vh-90px)]" id="page-content">
        <Outlet />
      </div>
    </div>
  );
};
