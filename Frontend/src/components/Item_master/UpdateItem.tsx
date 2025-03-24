import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Brand {
  id: number;
  brand_name: string;
}

const UpdateItem = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();  
  const [formData, setFormData] = useState({
    item_name: "",
    brand: "", 
    category: "",
    unit_price: "", 
    image: null as File | null,
  });
  const [message, setMessage] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]); 
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8001/items_master/get_brands/");
        if (!response.ok) throw new Error("Failed to fetch brands");
        const data: Brand[] = await response.json();
        setBrands(data); 
      } catch (error) {
        setMessage("Error fetching brands: " + (error as Error).message);
      }
    };
    fetchBrands();
  }, []); 

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8001/items_master/items/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setFormData({
          item_name: data.item_name,
          brand: data.brand?.id ? String(data.brand.id) : "",  
          category: data.category,
          unit_price: data.unit_price,
          image: null,  
        });
        setImagePreview(data.image);  
      } catch (error) {
        setMessage("Error fetching item: " + (error as Error).message);
      }
    };
    fetchItem();
  }, [id]);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("item_name", formData.item_name);
    form.append("category", formData.category);
    form.append("unit_price", formData.unit_price);
    if (formData.image) form.append("image", formData.image);
    if (formData.brand) form.append("brand", formData.brand);

    try {
      const response = await fetch(`http://127.0.0.1:8001/items_master/items/${id}/update/`, { 
        method: "PUT", 
        body: form 
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Item updated successfully!");
        setTimeout(() => navigate("/item"), 1000);
      } else {
        setMessage(`Error: ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("Error: " + (error as Error).message);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Update Item</h2>
      {message && (
        <div className={`mb-4 p-4 text-white rounded ${message.includes("Error") ? "bg-red-600" : "bg-green-600"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="item_name">Item Name:</label>
          <input type="text" name="item_name" id="item_name" value={formData.item_name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        {/* Brand Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="brand">Brand:</label>
          <select name="brand" id="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.brand_name}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category:</label>
          <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        {/* Unit Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="unit_price">Unit Price:</label>
          <input type="number" name="unit_price" id="unit_price" value={formData.unit_price} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">Upload Image:</label>
          <input type="file" name="image" id="image" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Image:</label>
            <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover border rounded-md" />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
