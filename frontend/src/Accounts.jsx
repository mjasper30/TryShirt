import "./css/index.css";
import SidebarComponent from "./component/SidebarComponent";
import NavbarComponent from "./component/NavbarComponent";
import CardsComponent from "./component/CardsComponent";
import TableComponent from "./component/TableComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";

export default function Accounts() {
  const [users, setUsers] = useState([]);

  // Fetch T-Shirt data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUsers");
        setUsers(response.data); // assuming the API returns an array of T-Shirts
      } catch (error) {
        console.error("Error fetching T-Shirts:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="h-full w-screen flex">
      <SidebarComponent />

      <div className="flex flex-col flex-1 w-full">
        <NavbarComponent />

        <div className="flex flex-col ml-60">
          <div className="font-bold text-2xl text-black my-10 z-100">
            Manage Accounts
          </div>

          <Table className="text-center w-[1000px]" striped hoverable>
            <Table.Head className="bg-slate-600">
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((users, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {users.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {users.username}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {users.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-green-600 p-2"
                        onClick={() => handleEditClick(rfid)}
                      >
                        edit
                      </span>
                    </i>
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-red-600 p-2"
                        onClick={() => {
                          setSelectedRfid(rfid);
                          setOpenDeleteModal(true);
                        }}
                      >
                        delete
                      </span>
                    </i>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
