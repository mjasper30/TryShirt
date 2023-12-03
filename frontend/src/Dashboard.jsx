import "./css/index.css";
import SidebarComponent from "./component/SidebarComponent";
import NavbarComponent from "./component/NavbarComponent";
import CardsComponent from "./component/CardsComponent";
import TableComponent from "./component/TableComponent";

export default function Dashboard() {
  return (
    <div className="h-full w-screen flex">
      <SidebarComponent />

      <div className="flex flex-col flex-1">
        <NavbarComponent />

        <div className="flex flex-col ml-60 mx-auto">
          <div className="font-bold text-2xl text-black ml-10 z-100">
            Dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
