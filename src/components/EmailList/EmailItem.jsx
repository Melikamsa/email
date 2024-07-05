import React from "react";

const EmailItem = ({ email, deleteEmail, editEmail }) => {
  const handleDeleteClick = () => {
    deleteEmail(email.id);
  };

  const handleEditClick = () => {
    editEmail(email.id);
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex flex-col">
        <span className="font-bold">{email.name}</span>
        <span className="text-gray-600">{email.email}</span>
      </div>
      <div>
        <button
          className="bg-red-500 p-2 px-3 rounded-md mx-1"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className="bg-green-600 p-2 px-3 rounded-md mx-1"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EmailItem;
