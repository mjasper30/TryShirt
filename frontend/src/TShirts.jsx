import "./css/index.css";
import SidebarComponent from "./component/SidebarComponent";
import NavbarComponent from "./component/NavbarComponent";
import {
  Table,
  Modal,
  TextInput,
  Label,
  Button,
  Select,
  FileInput,
} from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export default function TShirts() {
  const [openModal, setOpenModal] = useState(false);

  // Adding RFID data
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tshirt_name", e.currentTarget.tshirt_name.value);
    formData.append("brand_name", e.currentTarget.brand_name.value);
    formData.append("size", e.currentTarget["size_tshirt"].value);
    formData.append("price", e.currentTarget.price.value);
    formData.append("file_upload", e.currentTarget.file_upload.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addTshirt",
        formData
      );

      console.log(response.data); // handle success
      setOpenModal(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error:", error); // handle error
    }
  };

  return (
    <div className="h-full w-screen flex">
      <SidebarComponent />

      <div className="flex flex-col flex-1 w-full">
        <NavbarComponent />

        <div className="flex flex-col ml-60">
          <div className="font-bold text-2xl text-black my-10 z-100">
            T-Shirts
          </div>

          {/* Add Tshirt Modal */}
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add T-Shirt</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form className="flex max-w flex-col gap-4" onSubmit={onSubmit}>
                  <div className="max-w">
                    <div className="block">
                      <Label htmlFor="tshirt_name" value="T-Shirt Name" />
                    </div>
                    <TextInput
                      className="mb-4"
                      id="tshirt_name"
                      type="text"
                      placeholder="Enter T-Shirt Name"
                      required
                    />
                    <div className="block">
                      <Label htmlFor="brand_name" value="Brand Name" />
                    </div>
                    <TextInput
                      className="mb-4"
                      id="brand_name"
                      type="text"
                      placeholder="Enter Brand Name"
                      required
                    />
                    <div className="mb-2 block">
                      <Label htmlFor="size_tshirt" value="Size of T-Shirt" />
                    </div>
                    <Select id="size_tshirt" required>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                      <option value="Double XL">Double XL</option>
                    </Select>

                    <div className="block">
                      <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput
                      className="mb-4"
                      id="price"
                      type="number"
                      placeholder="Enter Price"
                      required
                    />
                    <div className="mb-2 block">
                      <Label htmlFor="file_upload" value="Upload file" />
                    </div>
                    <FileInput id="file_upload" />
                  </div>
                  <Button type="submit">Add</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>

          <div className="flex items-center justify-between w-[1000px]">
            <Button className="mb-5" onClick={() => setOpenModal(true)}>
              <span className="material-symbols-rounded -ml-1">add</span>
              Add T-Shirt
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
              <Table.HeadCell>#</Table.HeadCell>
              <Table.HeadCell>Shirt Name</Table.HeadCell>
              <Table.HeadCell>Brand</Table.HeadCell>
              <Table.HeadCell>Picture</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
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
