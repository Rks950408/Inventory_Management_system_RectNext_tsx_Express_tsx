import React, { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Define the type for the item prop
interface Item {
  id: number;
  item_name: string;
  category: string;
  brand_name: string;
  unit_price: number;
  image?: string; // Optional property
}

interface ItemRowProps {
  item: Item;
  index: number;
  onDelete: (id: number) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, index, onDelete }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8001/items_master/items/${item.id}/delete/`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        onDelete(item.id);
      } else {
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b">{index + 1}</td>
      <td className="py-2 px-4 border-b">{item.item_name}</td>
      <td className="py-2 px-4 border-b">{item.category}</td>
      <td className="py-2 px-4 border-b">{item.brand_name}</td>
      <td className="py-2 px-4 border-b">{item.unit_price}</td>
      <td className="py-2 px-4 border-b">
        {item.image ? (
          <img
            src={`http://127.0.0.1:8001/media/${item.image}`}
            alt={item.item_name}
            className="w-24 h-auto"
          />
        ) : (
          "No image available"
        )}
      </td>
      <td className="py-2 px-4 border-b">
        <a
          href={`/edit-item/${item.id}`}
          className="btn bg-blue-500 text-white rounded p-1"
        >
          Edit
        </a>
        <button
          className="btn bg-red-500 text-white rounded p-1 ml-2"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </td>

      {showModal && (
        <DeleteConfirmationModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
          itemName={item.item_name}
        />
      )}
    </tr>
  );
};

export default ItemRow;
