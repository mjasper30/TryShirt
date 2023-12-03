import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/images/TryShirt_logo.png";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 bg-[#dab772]">
      <Navbar.Brand>
        <img src={logo} className="mr-1 h-10 sm:h-15" alt="ReVendo Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-white">
          TryShirt
        </span>
      </Navbar.Brand>
    </Navbar>
  );
}
