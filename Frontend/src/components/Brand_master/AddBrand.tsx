import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const AddBrand: React.FC = () => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Define the type for change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  // Define the type for form submission event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "#",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brand_name: brandName }),
        }
      );

      const data: { message?: string } = await response.json(); // Type the response

      if (response.ok) {
        setMessage("Brand added successfully!");
        setBrandName("");
        setTimeout(() => navigate("/brands"), 2000); // Redirect after 2 seconds
      } else {
        setMessage(
          `Error: ${data.message || "Brand with this name already exists."}`
        );
      }
    } catch (error) {
      setMessage("Error: Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto mt-5">
              <Header/>

      <h2 className="text-2xl font-bold mb-4">Add Brand</h2>

      {message && (
        <div
          className={`mb-4 p-4 text-white rounded ${
            message.includes("Error") ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="brand_name"
          >
            Brand Name:
          </label>
          <input
            type="text"
            name="brand_name"
            id="brand_name"
            value={brandName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Save Brand
        </button>
      </form>
      <br />
      <button
        onClick={() => navigate("/brands")}
        className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
      >
        Back to Brands List
      </button>
    </div>
  );
};

export default AddBrand;
