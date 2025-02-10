import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./navbar";
import FooterComponent from "./footer";

function Layout() {
  return (
    <>
      <div>
        <NavbarComponent />
        <main>
          <Outlet />  
        </main>
        <FooterComponent />
      </div>
    </>
  );
}

export default Layout;
