import React, { useState, useEffect } from "react";
import ItemRow from "./ItemRow"; // Import the ItemRow component
import Header from "../Header";

// Define the structure of an Item
interface Item {
  id: number;
  item_name: string;  // Match API response
  category: string;
  brand_name: string; // Match API response
  unit_price: number;
  image_url: string;
}

const ItemList: React.FC = () => {
  // State to store fetched items
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8001/items_master/items/?search=${searchQuery}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          // Ensure API response matches the Item interface
          const formattedData: Item[] = data.map((item: any) => ({
            id: item.id,
            item_name: item.item_name, 
            category: item.category,
            brand_name: item.brand_name, 
            unit_price: item.unit_price,
            image_url: item.image_url,
          }));

          setItems(formattedData);
        } else {
          console.error("Failed to fetch items:", response.status);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = (e.currentTarget.elements.namedItem("search") as HTMLInputElement)?.value;
    setCurrentPage(1);
    setSearchQuery(searchValue);
  };

  const handleDeleteItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-5">
              <Header/>

      <h2 className="text-2xl font-bold mb-4 text-center">Items List</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <div className="flex">
          <input
            type="text"
            name="search"
            className="form-input w-96 border border-gray-300 rounded-l-md p-2"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn bg-blue-500 text-white rounded-r-md p-2" type="submit">
            Search
          </button>
        </div>
      </form>

      {/* Items Table */}
      <table className="min-w-full bg-white border border-gray-200 table-auto text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">S.No</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Unit Price</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ItemRow key={item.id} item={item} index={index} onDelete={handleDeleteItem} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn text-white rounded p-2 ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          Prev
        </button>

        <span className="my-auto text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn text-white rounded p-2 ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>

      {/* Add Item Button */}
      <div className="flex justify-center mt-4">
        <a href="/add-item" className="btn bg-green-500 text-white rounded p-2">
          Add Item
        </a>
      </div>
    </div>
  );
};

export default ItemList;
