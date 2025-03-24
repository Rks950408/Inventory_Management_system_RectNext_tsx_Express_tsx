import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define TypeScript interface for form data
interface SupplierFormData {
  name: string;
  contact: string;
  address: string;
  status: boolean;
  entry_date: string;
}

const AddSupplier: React.FC = () => {
  const navigate = useNavigate();
  
  // Define state with type safety
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    contact: "",
    address: "",
    status: true, // Default status
    entry_date: new Date().toISOString().split("T")[0], // Format date properly (YYYY-MM-DD)
  });

  const [errorMessage, setErrorMessage] = useState<string>(""); // For displaying error messages

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    if (!formData.name || !formData.contact || !formData.address) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8001/supplier/suppliers/create/", formData);
      console.log("Supplier added successfully:", response.data);
      navigate("/suppliers-list"); // Redirect after success
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Supplier</h2>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Add Supplier
        </button>
      </form>
      <br />
      <button
        onClick={() => navigate("/suppliers-list")}
        className="w-full bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
      >
        Back to Supplier List
      </button>
    </div>
  );
};

export default AddSupplier;
