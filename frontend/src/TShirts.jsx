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
import { useState, useEffect } from "react";
import axios from "axios";

export default function TShirts() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTshirt, setSelectedTshirt] = useState(null);
  const [tshirts, setTshirts] = useState([]);

  // Adding tshirt data
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

      // Fetch the updated data after edit
      fetchTshirts();
    } catch (error) {
      console.error("Error:", error); // handle error
    }
  };

  //Edit tshirt functionality
  const handleEditClick = (tshirt) => {
    setSelectedTshirt(tshirt);
    setOpenEditModal(true);
  };

  // Function to handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("tshirt_name", e.currentTarget.tshirt_name.value);
      formData.append("brand_name", e.currentTarget.brand_name.value);
      formData.append("price", e.currentTarget.price.value);
      formData.append("size", e.currentTarget["size_tshirt"].value);

      // Assuming you have a file input with the name "file_upload"
      formData.append("file_upload", e.currentTarget.file_upload.files[0]);

      // Assuming that your server endpoint for edit is something like "/api/tshirts/:id"
      await axios.put(
        `http://localhost:5000/api/tshirts/${selectedTshirt?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Close the edit modal
      setOpenEditModal(false);

      // Fetch the updated data after edit
      fetchTshirts();
    } catch (error) {
      console.error("Error updating T-shirt:", error);
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    try {
      // Assuming that your server endpoint for delete is something like "/api/users/:id"
      await axios.delete(
        `http://localhost:5000/api/tshirts/${selectedTshirt?.id}`
      );

      // Close the delete modal
      setOpenDeleteModal(false);

      // Refresh the data after deletion
      fetchTshirts();
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const fetchTshirts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getTshirts");
      setTshirts(response.data); // assuming the API returns an array of T-Shirts
    } catch (error) {
      console.error("Error fetching T-Shirts:", error);
    }
  };

  // Fetch T-Shirt data on component mount
  useEffect(() => {
    fetchTshirts();
  }, []); // Empty dependency array means this effect runs once on mount

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
                    <FileInput
                      id="file_upload"
                      helperText="Accepts only PNG image format"
                      accept=".png"
                    />
                  </div>
                  <Button type="submit">Add</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>

          {/* Edit Tshirt Modal */}
          <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
            <Modal.Header>Edit T-Shirt</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <form
                  className="flex max-w flex-col gap-4"
                  onSubmit={handleEditSubmit}
                >
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
                      value={selectedTshirt?.tshirt_name || ""}
                      onChange={(e) =>
                        setSelectedTshirt({
                          ...selectedTshirt,
                          tshirt_name: e.target.value,
                        })
                      }
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
                      value={selectedTshirt?.brand || ""}
                      onChange={(e) =>
                        setSelectedTshirt({
                          ...selectedTshirt,
                          brand: e.target.value,
                        })
                      }
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
                      value={selectedTshirt?.price || ""}
                      onChange={(e) =>
                        setSelectedTshirt({
                          ...selectedTshirt,
                          price: e.target.value,
                        })
                      }
                    />
                    <div className="mb-2 block">
                      <Label htmlFor="file_upload" value="Upload file" />
                    </div>
                    <FileInput
                      id="file_upload"
                      helperText="Accepts only PNG image format"
                      accept=".png"
                    />
                  </div>
                  <Button type="submit">Update</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
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
                  Are you sure you want to delete this tshirt?
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
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Shirt Name</Table.HeadCell>
              <Table.HeadCell>Brand</Table.HeadCell>
              <Table.HeadCell>Picture</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Size</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {tshirts.map((tshirt, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tshirt.tshirt_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tshirt.brand}
                  </Table.Cell>
                  <Table.Cell>
                    {tshirt.file_upload && (
                      <div className="flex justify-center items-center">
                        <img
                          src={`http://localhost:5000/uploads/${tshirt.file_upload}`}
                          alt={tshirt.tshirt_name}
                          style={{ width: "70px", height: "70px" }}
                        />
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tshirt.price}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tshirt.size}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-green-600 p-2"
                        onClick={() => handleEditClick(tshirt)}
                      >
                        edit
                      </span>
                    </i>
                    <i>
                      <span
                        className="material-symbols-rounded cursor-pointer text-red-600 p-2"
                        onClick={() => {
                          setSelectedTshirt(tshirt);
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
