import React from 'react'; 
import { Button } from 'primereact/button';

interface SubmitButtonProps {
    handleSubmit: () => void;
}

const SubmitButton = ({ handleSubmit }: SubmitButtonProps) => {
    return (
        <div className="flex flex-column gap-2 mt-4">
            <Button onClick={handleSubmit} className="w-10" label="Log In" />
        </div>
    )
}

export default SubmitButton;
