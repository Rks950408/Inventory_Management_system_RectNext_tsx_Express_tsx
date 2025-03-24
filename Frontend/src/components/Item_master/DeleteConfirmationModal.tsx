import React from "react";

interface DeleteConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string; // Optional, defaults to "this item"
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onCancel, onConfirm, itemName = "this item" }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold text-center">
          Are you sure you want to delete this item?
        </h3>
        <p className="my-4 text-center">
          Item: <strong>{itemName}</strong>
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black rounded px-6 py-2 text-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white rounded px-6 py-2 text-lg hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

