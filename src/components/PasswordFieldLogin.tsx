import React from "react";
import { Password } from 'primereact/password';

export default function PasswordFieldLogin({ password, setPassword, invalid }: { password: string; setPassword: (value: string) => void; invalid: boolean }) {
    return (
        <div className="flex flex-column gap-2 mt-4">
            <div className="password">
                <div className="flex flex-column gap-2 w-full">
                    <label htmlFor="Password">Password</label>
                    <Password
                        className={invalid ? 'p-invalid' : ''}
                        value={password}
                    onChange={e => setPassword(e.target.value)} 
                    toggleMask
                    style={{ width: '100%' }} 
                />
            </div>
            </div>
        </div>
    );
}
