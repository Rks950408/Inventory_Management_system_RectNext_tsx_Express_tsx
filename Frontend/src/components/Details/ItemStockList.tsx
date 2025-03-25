import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../Header";

interface StockItem {
  id: number;
  name: string;
  totalPurchased: number;
  totalSold: number;
}

const ItemStockList: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8001/purchases/stock-list/?search=${searchTerm}&item=${selectedItem}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const fetchedItems: StockItem[] = data.stock_data.map((item: any) => ({
          id: item[0],
          name: item[1],
          totalPurchased: item[3],
          totalSold: item[2],
        }));

        setItems(fetchedItems);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchTerm, selectedItem]);

  return (
    <div className="p-6">
              <Header/>

      <h2 className="text-2xl font-bold mb-6 text-center">Item Stock List</h2>

      <div className="flex justify-between items-center mb-6 space-x-4">
        {/* Filter by Item Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="item" className="text-lg font-medium">
            Filter by Item:
          </label>
          <select
            id="item"
            name="item"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All</option>
            {items.map((stock) => (
              <option key={stock.id} value={stock.id.toString()}>
                {stock.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Field */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search by Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 outline-none w-64 rounded-l-lg"
          />
          <button className="bg-blue-500 p-2 text-white rounded-r-lg">
            <FaSearch />
          </button>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 border">S.No.</th>
              <th className="py-3 px-4 border">Item Name</th>
              <th className="py-3 px-4 border">Total Purchased</th>
              <th className="py-3 px-4 border">Total Sold</th>
              <th className="py-3 px-4 border">Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id}
                  className="even:bg-gray-100 hover:bg-gray-200"
                >
                  <td className="py-3 px-4 border">{index + 1}</td>
                  <td className="py-3 px-4 border">{item.name}</td>
                  <td className="py-3 px-4 border">{item.totalPurchased}</td>
                  <td className="py-3 px-4 border">{item.totalSold}</td>
                  <td className="py-3 px-4 border">
                    {item.totalPurchased - item.totalSold}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3 px-4 border text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemStockList;
