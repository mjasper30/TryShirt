import "./css/index.css";
import SidebarComponent from "./component/SidebarComponent";
import NavbarComponent from "./component/NavbarComponent";
import CardsComponent from "./component/CardsComponent";
import TableComponent from "./component/TableComponent";
import { Table } from "flowbite-react";

export default function Accounts() {
  return (
    <div className="h-full w-screen flex">
      <SidebarComponent />

      <div className="flex flex-col flex-1 w-full">
        <NavbarComponent />

        <div className="flex flex-col ml-60">
          <div className="font-bold text-2xl text-black my-10 z-100">
            Manage Accounts
          </div>

          <Table className="text-center" striped hoverable>
            <Table.Head className="bg-slate-600">
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Shirt Name</Table.HeadCell>
              <Table.HeadCell>Brand</Table.HeadCell>
              <Table.HeadCell>Picture</Table.HeadCell>
              <Table.HeadCell>Size</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  1
                </Table.Cell>
                <Table.Cell>33a537c2</Table.Cell>
                <Table.Cell>45</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-green-600 p-2">
                      edit
                    </span>
                  </i>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-red-600 p-2">
                      delete
                    </span>
                  </i>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  2
                </Table.Cell>
                <Table.Cell>737832c2</Table.Cell>
                <Table.Cell>23</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-green-600 p-2">
                      edit
                    </span>
                  </i>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-red-600 p-2">
                      delete
                    </span>
                  </i>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  3
                </Table.Cell>
                <Table.Cell>e3153ec2</Table.Cell>
                <Table.Cell>15</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-green-600 p-2">
                      edit
                    </span>
                  </i>
                  <i>
                    <span className="cursor-pointer material-symbols-rounded text-red-600 p-2">
                      delete
                    </span>
                  </i>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
