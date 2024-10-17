import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import InputFieldLogin from "./InputFieldLogin";
import Dropdownc from "./DropdownFieldLogin";
import PasswordFieldLogin from "./PasswordFieldLogin";
import SubmitButton from "./SubmitButton";
import Background from "./Background"; // Import Background component

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [error, setError] = useState({ username: false, password: false, organization: false });
  
  const navigate = useNavigate();

  const resetError = (field: keyof typeof error) => {
    setError(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    const newError = {
      username: !username, 
      password: !password, 
      organization: !selectedOrganization 
    };
    setError(newError);

    if (!newError.username && !newError.password && !newError.organization) {
      navigate('/program'); 
    }

    console.log('username:', username);
    console.log('password:', password);
    console.log('organization:', selectedOrganization);
  };

  return (
    <>
      <Background /> {/* Add Background component here */}
      <div className="form">
        <div className="flex justify-content-center align-items-center flex-wrap "> 
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
