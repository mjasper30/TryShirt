import { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { useLocation } from "react-router-dom";
import React from "react";

const SidebarComponent = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="fixed sidebar bg-[#35363D] text-white h-full w-52 flex flex-col items-center z-50">
      <div className="flex items-center mt-24">
        <SidebarLink
          to="/dashboard"
          text="dashboard"
          isActive={activeLink === "/dashboard"}
          onClick={() => setActiveLink("/dashboard")}
        />
        <h3 className="font-semibold text-white ml-2 w-24">Dashboard</h3>
      </div>
      <div className="flex items-center">
        <SidebarLink
          to="/tshirts"
          text="laundry"
          isActive={activeLink === "/tshirts"}
          onClick={() => setActiveLink("/tshirts")}
        />
        <h3 className="font-semibold text-white ml-2 w-24">T-Shirts</h3>
      </div>
      <div className="flex items-center">
        <SidebarLink
          to="/accounts"
          text="manage_accounts"
          isActive={activeLink === "/accounts"}
          onClick={() => setActiveLink("/accounts")}
        />
        <h3 className="font-semibold text-white ml-2 w-24">Accounts</h3>
      </div>
      <div className="flex items-center">
        <SidebarLink
          to="/login"
          text="logout"
          isActive={activeLink === "/login"}
          onClick={() => setActiveLink("/login")}
        />
        <h3 className="font-semibold text-white ml-2 w-24">Logout</h3>
      </div>
    </div>
  );
};

export default SidebarComponent;