import React from "react";
import EmailItem from "./EmailItem.jsx";

const EmailList = ({ emails, deleteEmail, editEmail }) => {
  return (
    <div className="my-5">
      <h1 className="font-bold text-xl">Email List</h1>
      <ul>
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            deleteEmail={deleteEmail}
            editEmail={editEmail}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
