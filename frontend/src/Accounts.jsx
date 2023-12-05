import "./css/index.css";
import SidebarComponent from "./component/SidebarComponent";
import NavbarComponent from "./component/NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, TextInput, Label, Button, Select } from "flowbite-react";

export default function Accounts() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Adding user data
  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: e.currentTarget.name.value,
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      role: e.currentTarget["role"].value,
      password: e.currentTarget.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addUser",
        userData
      );

      console.log(response.data); // handle success
      setOpenModal(false); // Close the modal after successful submission

      // Fetch the updated data after edit
      fetchUsers();
    } catch (error) {
      console.error("Error:", error); // handle error
    }
  };

  // Function to handle edit button click
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  // Function to handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming that your server endpoint for edit is something like "/api/users/:id"
      await axios.put(`http://localhost:5000/api/users/${selectedUser?.id}`, {
        name: e.currentTarget.name.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        role: e.currentTarget["role"].value,
        password: e.currentTarget.password.value,
      });

      // Close the edit modal
      setOpenEditModal(false);

      // Refresh the data after edit
      fetchUsers();
    } catch (error) {
      console.error("Error updating RFID:", error);
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    try {
      // Assuming that your server endpoint for delete is something like "/api/users/:id"
      await axios.delete(`http://localhost:5000/api/users/${selectedUser?.id}`);

      // Close the delete modal
      setOpenDeleteModal(false);

      // Refresh the data after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getUsers");
      setUsers(response.data); // assuming the API returns an array of T-Shirts
    } catch (error) {
      console.error("Error fetching T-Shirts:", error);
    }
  };

  // Fetch T-Shirt data on component mount
  useEffect(() => {
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

          {/* Add Modal */}
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add User</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form className="flex max-w flex-col gap-4" onSubmit={onSubmit}>
                  <div className="block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    required
                    onChange={(e) =>
                      setSelectedUser((selectedUser) => ({
                        ...selectedUser,
                        name: e.target.value,
                      }))
                    }
                  />
                  <div className="block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    required
                    onChange={(e) =>
                      setSelectedUser((selectedUser) => ({
                        ...selectedUser,
                        username: e.target.value,
                      }))
                    }
                  />
                  <div className="block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) =>
                      setSelectedUser((selectedUser) => ({
                        ...selectedUser,
                        email: e.target.value,
                      }))
                    }
                  />
                  <div className="max-w">
                    <div className="mb-2 block">
                      <Label htmlFor="role" value="Role" />
                    </div>
                    <Select id="role" required>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </Select>
                  </div>
                  <div className="block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) =>
                      setSelectedUser((selectedUser) => ({
                        ...selectedUser,
                        password: e.target.value,
                      }))
                    }
                  />
                  <div className="block">
                    <Label htmlFor="password_c" value="Confirm Password" />
                  </div>
                  <TextInput
                    id="password_c"
                    type="password"
                    placeholder="Enter confirm password"
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        c_password: e.target.value,
                      })
                    }
                  />
                  <Button type="submit">Add</Button>
                  <Button color="gray" onClick={() => setOpenEditModal(false)}>
                    Cancel
                  </Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>

          {/* Edit Modal */}
          <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
            <Modal.Header>Edit User</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form
                  className="flex max-w flex-col gap-4"
                  onSubmit={handleEditSubmit}
                >
                  <div className="block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    required
                    value={selectedUser?.name || ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        name: e.target.value,
                      })
                    }
                  />
                  <div className="block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    required
                    value={selectedUser?.username || ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
                    }
                  />
                  <div className="block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    required
                    value={selectedUser?.email || ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="max-w">
                    <div className="mb-2 block">
                      <Label htmlFor="role" value="Role" />
                    </div>
                    <Select
                      id="role"
                      required
                      value={selectedUser?.role || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </Select>
                  </div>
                  <div className="block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        password: e.target.value,
                      })
                    }
                  />
                  {/* <div className="block">
                    <Label htmlFor="password_c" value="Confirm Password" />
                  </div>
                  <TextInput
                    id="password_c"
                    type="password"
                    placeholder="Enter Confirm Password"
                    required
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        c_password: e.target.value,
                      })
                    }
                  /> */}
                  <Button type="submit">Update</Button>
                  <Button color="gray" onClick={() => setOpenEditModal(false)}>
                    Cancel
                  </Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>

          {/* Delete Modal */}
          <Modal
            show={openDeleteModal}
            size="md"
            onClose={() => setOpenDeleteModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <span className="material-symbols-rounded -ml-1">warning</span>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this user?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteClick}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <div className="flex items-center justify-between w-[1000px]">
            <Button className="mb-5" onClick={() => setOpenModal(true)}>
              <span className="material-symbols-rounded -ml-1">add</span>
              Add Account
            </Button>
            <div className="max-w-xs">
              <TextInput
                id="search"
                type="text"
                placeholder="Search"
                className="mb-3"
              />
            </div>
          </div>

          <Table className="text-center w-[1000px]" striped hoverable>
            <Table.Head className="bg-slate-600">
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
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
                    {users.role}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-green-600 p-2"
                        onClick={() => handleEditClick(users)}
                      >
                        edit
                      </span>
                    </i>
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-red-600 p-2"
                        onClick={() => {
                          setSelectedUser(users);
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
