import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddNewEmail = ({ addEmail, editMode, initialData, updateEmail, setEditMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editMode && initialData) {
      reset(initialData);
    } else {
      reset();
    }
  }, [editMode, initialData, reset]);

  const onFormSubmit = (data) => {
    if (editMode) {
      updateEmail(data);
      setEditMode(false);
    } else {
      addEmail(data);
    }
    reset();
  };

  useEffect(() => {
    if (!editMode) {
      reset({ email: "", name: "" });
    }
  }, [editMode, reset]);

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
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <input
          className="border-2 rounded-md border-[#AFD198] p-2 my-3 outline-none w-[100%]"
          type="text"
          placeholder="name..."
          {...register("name", { required: "Please enter your name" })}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        <input
          className="rounded-md bg-[#AFD198] border-[#AFD198] p-2 my-3 px-10"
          type="submit"
          value={editMode ? "Save Changes" : "Save"}
        />
      </form>
    </div>
  );
};

export default AddNewEmail;