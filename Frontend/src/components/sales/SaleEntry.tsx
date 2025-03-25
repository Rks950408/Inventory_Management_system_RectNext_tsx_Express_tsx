import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

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

interface Supplier {
  id: number;
  name: string;
}

interface PurchaseDetail {
  itemName: string;
  brand: string;
  price: number;
  quantity: number;
  total: number;
}

const SaleEntry: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [availableQuantity, setAvailableQuantity] = useState<string>("");
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetail[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplier, setSupplier] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get<Supplier[]>("http://127.0.0.1:8001/supplier/suppliers/")
      .then((response) => setSuppliers(response.data))
      .catch((error) => console.error("Error fetching suppliers:", error));

    axios
      .get<Item[]>("http://127.0.0.1:8001/items_master/items/")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));

    axios
      .get<Brand[]>("http://127.0.0.1:8001/items_master/get_brands/")
      .then((response) => setBrands(response.data))
      .catch((error) => console.error("Error fetching brands:", error));

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const minsec = `${String(now.getMinutes()).padStart(2, "0")}${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
    setInvoiceNo(`IN-${dd}${mm}${yyyy}-${minsec}`);
    setInvoiceDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleItemChange = async (selectedItemName: string) => {
    setItemName(selectedItemName);
    const selectedItem = items.find((item) => item.item_name === selectedItemName);
    if (selectedItem) {
      const selectedBrand = brands.find((brand) => String(brand.id) === String(selectedItem.brand));
      setBrand(selectedBrand ? selectedBrand.brand_name : "Brand Not Found");
      setPrice(selectedItem.unit_price.toString());

      try {
        const quantityResponse = await axios.get<{ available_quantity: number }>(
          `http://127.0.0.1:8001/purchases/total-quantity/${selectedItem.id}/`
        );
        setAvailableQuantity(quantityResponse.data?.available_quantity?.toString() || "Not Available");
      } catch (error) {
        console.error("Error fetching available quantity:", error);
        setAvailableQuantity("Error fetching quantity");
      }
    } else {
      setBrand("No Item Selected");
      setPrice("");
      setAvailableQuantity("");
    }
  };

  const handleAddItem = () => {
    if (itemName && price && quantity) {
      const enteredQuantity = parseInt(quantity, 10);
      if (enteredQuantity <= 0) {
        alert("Quantity must be greater than zero.");
        return;
      }
      if (enteredQuantity > parseInt(availableQuantity, 10)) {
        alert("Entered quantity is greater than available stock!");
        return;
      }
      const itemTotal = parseFloat((parseFloat(price) * enteredQuantity).toFixed(2));
      const existingItemIndex = purchaseDetails.findIndex((item) => item.itemName === itemName);

      if (existingItemIndex !== -1) {
        const updatedDetails = [...purchaseDetails];
        updatedDetails[existingItemIndex].quantity += enteredQuantity;
        updatedDetails[existingItemIndex].total += itemTotal;
        setPurchaseDetails(updatedDetails);
      } else {
        setPurchaseDetails([...purchaseDetails, { itemName, brand, price: parseFloat(price), quantity: enteredQuantity, total: itemTotal }]);
      }
      setSubTotal((prev) => prev + itemTotal);
      setItemName("");
      setBrand("");
      setPrice("");
      setQuantity("");
      setTotal("");
      setAvailableQuantity("");
    }
  };

  return (
    <div className="container mx-auto p-6">
              <Header/>

      <h2 className="text-3xl font-bold mb-6">Sale Entry</h2>
      {successMessage && <div className="text-green-500 font-semibold mb-4">{successMessage}</div>}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2">Invoice No:</label>
          <input type="text" value={invoiceNo} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
        </div>
        <div>
          <label className="block mb-2">Invoice Date:</label>
          <input type="text" value={invoiceDate} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default SaleEntry;