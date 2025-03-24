import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Supplier {
  id: number;
  name: string;
}

interface Item {
  id: number;
  item_name: string;
  brand: number;
  unit_price: number;
}

interface Brand {
  id: number;
  brand_name: string;
}

interface PurchaseDetail {
  itemName: string;
  brand: string;
  price: number;
  quantity: number;
  total: number;
}

const PurchaseEntry: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplier, setSupplier] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8001/supplier/suppliers/")
      .then(response => setSuppliers(response.data))
      .catch(error => console.error("Error fetching suppliers:", error));

    axios.get("http://127.0.0.1:8001/items_master/items/")
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching items:", error));

    axios.get("http://127.0.0.1:8001/items_master/get_brands/")
      .then(response => setBrands(response.data))
      .catch(error => console.error("Error fetching brands:", error));

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const minsec = `${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    setInvoiceNo(`IN-${dd}${mm}${yyyy}-${minsec}`);
    setInvoiceDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleItemChange = (selectedItemName: string) => {
    setItemName(selectedItemName);
    const selectedItem = items.find(item => item.item_name === selectedItemName);
    if (selectedItem) {
      const selectedBrand = brands.find(brand => brand.id === selectedItem.brand);
      setBrand(selectedBrand ? selectedBrand.brand_name : "Brand Not Found");
      setPrice(selectedItem.unit_price);
    } else {
      setBrand("No Item Selected");
      setPrice("");
    }
  };

  const handleAddItem = () => {
    if (itemName && price && quantity) {
      const itemTotal = parseFloat((Number(price) * Number(quantity)).toFixed(2));
      setPurchaseDetails([...purchaseDetails, { itemName, brand, price: Number(price), quantity: Number(quantity), total: itemTotal }]);
      setSubTotal(prev => prev + itemTotal);
      setItemName("");
      setBrand("");
      setPrice("");
      setQuantity("");
    }
  };

  const handleSubmit = async () => {
    const purchaseData = {
      invoice_no: invoiceNo,
      invoice_date: invoiceDate,
      supplier,
      total_amount: subTotal,
      purchase_details: purchaseDetails.map(item => ({
        item_name: item.itemName,
        brand_name: item.brand,
        price: item.price,
        quantity: item.quantity,
        amount: item.total,
      })),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8001/purchases/purchase-entry/", purchaseData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/purchase-list"), 1000);
    } catch (error) {
      console.error("Error submitting purchase data:", error);
      setSuccessMessage("Failed to submit purchase data. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Purchase Entry</h2>
      {successMessage && <div className="text-green-500 font-semibold mb-4">{successMessage}</div>}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label>Invoice No:</label>
          <input type="text" value={invoiceNo} readOnly className="w-full px-3 py-2 border rounded-md bg-gray-100" />
        </div>
        <div>
          <label>Invoice Date:</label>
          <input type="text" value={invoiceDate} readOnly className="w-full px-3 py-2 border rounded-md bg-gray-100" />
        </div>
        <div>
          <label>Supplier Name:</label>
          <select value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select Supplier</option>
            {suppliers.map(sup => <option key={sup.id} value={sup.name}>{sup.name}</option>)}
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </div>
  );
};

export default PurchaseEntry;
