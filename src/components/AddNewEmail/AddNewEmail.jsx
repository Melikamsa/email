import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddNewEmail = ({
  addEmail,
  editMode,
  initialData,
  updateEmail,
  setEditMode,
  emails,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", name: "" });

  useEffect(() => {
    if (editMode && initialData) {
      setFormData(initialData);
    } else {
      setFormData({ email: "", name: "" });
    }
  }, [editMode, initialData]);

  const onFormSubmit = async (data) => {
    const isDuplicate = checkForDuplicates(data);
    if (isDuplicate) {
      setFormData({ email: "", name: "" });
      setError("Duplicate email or name detected!");
      return;
    } else {
      setError(null);
    }

    if (editMode) {
      updateEmail(data);
      setEditMode(false);
    } else {
      addEmail(data);
    }
    resetForm();
  };

  const resetForm = () => {
    reset();
    setFormData({ email: "", name: "" });
  };

  const checkForDuplicates = (newData) => {
    const duplicateEmail = emails.some(
      (email) => email.email === newData.email
    );
    const duplicateName = emails.some((email) => email.name === newData.name);
    return duplicateEmail || duplicateName;
  };

  return (
    <div className="m-2">
      <h1 className="font-extrabold text-xl">Manage e-mail addresses</h1>
      <h2 className="mt-4 font-bold">
        {editMode ? "Edit Email" : "Add New Email"}
      </h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          className="border-2 rounded-md border-[#AFD198] p-2 my-3 outline-none w-[100%]"
          type="email"
          placeholder="email..."
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <input
          className="border-2 rounded-md border-[#AFD198] p-2 my-3 outline-none w-[100%]"
          type="text"
          placeholder="name..."
          {...register("name", { required: "Please enter your name" })}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        <input
          className="rounded-md bg-[#AFD198] border-[#AFD198] p-2 my-3 px-10"
          type="submit"
          value={editMode ? "Save Changes" : "Save"}
        />
        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default AddNewEmail;
