import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

// Define types for form data and brand data
interface FormDataType {
  item_name: string;
  brand: string; // Stores brand ID as a string
  category: string;
  unit_price: string;
  image: File | null;
}

interface BrandType {
  id: number;
  brand_name: string;
}

const AddItem: React.FC = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState<FormDataType>({
    item_name: "",
    brand: "",
    category: "",
    unit_price: "",
    image: null,
  });

  // State for message and brand list
  const [message, setMessage] = useState<string>("");
  const [brands, setBrands] = useState<BrandType[]>([]);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8001/items_master/get_brands/");
        if (!response.ok) throw new Error("Failed to fetch brands");

        const data: BrandType[] = await response.json();
        setBrands(data);
      } catch (error) {
        setMessage("Error fetching brands: " + error);
      }
    };

    fetchBrands();
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change safely
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.brand) {
      setMessage("Please select a valid brand.");
      return;
    }

    const form = new FormData();
    form.append("item_name", formData.item_name);
    form.append("category", formData.category);
    form.append("unit_price", formData.unit_price);
    form.append("brand", formData.brand); // Brand ID as a string
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await fetch("http://127.0.0.1:8001/items_master/items/create/", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Item added successfully!");
        setTimeout(() => navigate("/item"), 1000);
      } else {
        setMessage(`Error: ${data.message || "This item already exists."}`);
      }
    } catch (error) {
      setMessage("Error: Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto mt-5">
              <Header/>

      <h2 className="text-2xl font-bold mb-4">Add Item</h2>
      {message && (
        <div className={`mb-4 p-4 text-white rounded ${message.includes("Error") ? "bg-red-600" : "bg-green-600"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Item Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="item_name">
            Item Name:
          </label>
          <input
            type="text"
            name="item_name"
            id="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Brand Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="brand">
            Brand Name:
          </label>
          <select
            name="brand"
            id="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id.toString()}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationary">Stationary</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Unit Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="unit_price">
            Unit Price:
          </label>
          <input
            type="number"
            name="unit_price"
            id="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
          Save Item
        </button>
      </form>

      <br />
      {/* Back to Items List Button */}
      <button onClick={() => navigate("/item")} className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600">
        Back to Items List
      </button>
    </div>
  );
};

export default AddItem;
