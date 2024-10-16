import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function InputFieldLogin({ username, setUsername, invalid }: { username: string, setUsername: (username: string) => void, invalid: boolean }) {
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setEmailEmpty(value.trim() === ""); // Check if the input is empty
    setEmailInvalid(!validateEmail(value)); // Validate the email format
  };

  return (
    <div className="flex flex-column gap-2 mt-4"> 
      <div className="flex flex-column gap-2 w-10">
        <label htmlFor="username">Email</label>
        <InputText
          id="username"
          aria-describedby="username-help"
          value={username}
          onChange={handleChange}
          placeholder="Enter your email"
          className={invalid || emailInvalid || emailEmpty ? 'p-invalid' : ''}
        />
        {emailEmpty ? ( // Show error message for empty input
          <small id="username-help" className="text-red-800">
            Enter your Email Address
          </small>
        ) : emailInvalid ? ( // Show error message for invalid email
          <small id="username-help" className="text-red-800">
            Enter a valid Email Address
          </small>
        ) : null}
      </div>
    </div>
  );
}
