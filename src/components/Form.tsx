import { useState } from "react";
import "../App.css";
import InputFieldLogin from "./InputFieldLogin";
import Dropdownc from "./DropdownFieldLogin";
import PasswordFieldLogin from "./PasswordFieldLogin";
import SubmitButton from "./SubmitButton";

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [error, setError] = useState({ username: false, password: false, organization: false });

  const resetError = (field: keyof typeof error) => {
    setError(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    // Always set errors to true when submitting
    const newError = {
      username: true, // Trigger error for username
      password: true, // Trigger error for password
      organization: true // Trigger error for organization
    };
    setError(newError);

    // Set username to empty to trigger validation message
    setUsername(''); // This will trigger the email validation message

    // Log the values regardless of errors
    console.log('username:', username);
    console.log('password:', password);
    console.log('organization:', selectedOrganization);
  };

  return (
    <>
      <div className="form">
        <div className="flex justify-content-center align-items-center flex-wrap "> {/* Added align-items-center */}
          <h2 className="text-gray-700 m-0 p-0">Welcome Back</h2>{" "}
        </div>
        <div className="flex justify-content-center align-items-center">
          <h5 className="my-1 p-0 font-normal">Please Login to Continue</h5>{" "}
        </div>
        <InputFieldLogin username={username} setUsername={(value) => { setUsername(value); resetError('username'); }} invalid={error.username} />
        <Dropdownc selectedOrganization={selectedOrganization} setSelectedOrganization={(value) => { setSelectedOrganization(value); resetError('organization'); }} invalid={error.organization} />
        <PasswordFieldLogin password={password} setPassword={(value) => { setPassword(value); resetError('password'); }} invalid={error.password} />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default Form;
