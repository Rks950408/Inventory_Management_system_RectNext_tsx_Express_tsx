import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";

// Define the Sale data structure
interface Sale {
  id: number;
  invoice_no: string;
  invoice_date: string;
  customer?: { name: string } | null; // Customer can be null
  total_amount: number;
}

const SaleList: React.FC = () => {
  const navigate = useNavigate();
  
  // State to store sale records
  const [saleData, setSaleData] = useState<Sale[]>([]);

  // Fetch sales data from the API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8001/purchases/sales-get/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSaleData(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setSaleData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
        setSaleData([]); // Reset data on failure
      });
  }, []);

  // Navigate to the add-sale page
  const handleSaleRedirect = () => {
    navigate("/sale");
  };

  // Navigate to the sale details page
  const handleViewClick = (id: number) => {
    navigate(`/sale-details/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
              <Header/>

      <h1 className="text-2xl font-bold text-center mb-6">Sales List</h1>

      {/* Add Sale Button */}
      <div className="mb-4">
        <button
          onClick={handleSaleRedirect}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Sale
        </button>
      </div>

      {/* Sales Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2 text-left border-b">S.No.</th>
            <th className="px-4 py-2 text-left border-b">Invoice Number</th>
            <th className="px-4 py-2 text-left border-b">Invoice Date</th>
            <th className="px-4 py-2 text-left border-b">Customer</th>
            <th className="px-4 py-2 text-left border-b">Amount</th>
            <th className="px-4 py-2 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {saleData.length > 0 ? (
            saleData.map((sale, index) => (
              <tr key={sale.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{sale.invoice_no}</td>
                
                {/* Format the date properly */}
                <td className="px-4 py-2 border-b">
                  {new Date(sale.invoice_date).toLocaleDateString("en-IN")}
                </td>

                {/* Handle missing customer name */}
                <td className="px-4 py-2 border-b">
                  {sale.customer?.name || "N/A"}
                </td>

                {/* Handle null or undefined total_amount */}
                <td className="px-4 py-2 border-b">
                  ₹ {sale.total_amount ? sale.total_amount.toFixed(2) : "0.00"}
                </td>

                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleViewClick(sale.id)}
                    className="px-4 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No sales records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SaleList;
