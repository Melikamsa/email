import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar/SideBar.jsx";
import AddNewEmail from "./components/AddNewEmail/AddNewEmail.jsx";
import EmailList from "./components/EmailList/EmailList.jsx";

function App() {
  const [emails, setEmails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      setEmails(JSON.parse(storedEmails));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("emails", JSON.stringify(emails));
    }
  }, [emails, isInitialized]);

  const addEmail = (data) => {
    setEmails([...emails, { ...data, id: emails.length + 1 }]);
  };

  const updateEmail = (data) => {
    const updatedEmails = emails.map((email) =>
      email.id === selectedEmailId ? { ...email, ...data } : email
    );
    setEmails(updatedEmails);
    setEditMode(false); 
    setEditData(null); 
    setSelectedEmailId(null);
  };

  const deleteEmail = (id) => {
    const updatedEmails = emails.filter((email) => email.id !== id);
    setEmails(updatedEmails);
    cancelEdit();
  };

  const editEmail = (id) => {
    const emailToEdit = emails.find((email) => email.id === id);
    if (selectedEmailId !== id) {
      cancelEdit();
    }
    setEditMode(true);
    setEditData(emailToEdit);
    setSelectedEmailId(id);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditData(null);
    setSelectedEmailId(null);
  };

  return (
    <div className="min-[500px]:flex xl:text-xl p-1">
      <SideBar />
      <div className="py-5 md:mx-10 md:w-[100%]">
        <AddNewEmail
          addEmail={addEmail}
          editMode={editMode}
          setEditMode={setEditMode}
          initialData={editData}
          updateEmail={updateEmail}
          emails={emails} 
        />
        <EmailList
          emails={emails}
          deleteEmail={deleteEmail}
          editEmail={editEmail}
        />
      </div>
    </div>
  );
}

export default App;
