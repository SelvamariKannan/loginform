import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import SideNav from './SideNav';
import { MenuItem } from 'primereact/menuitem';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { useParams, useNavigate } from 'react-router-dom';  

const breadcrumbItems: MenuItem[] = [
    { label: 'Dashboard', url: '/dashboard ' },
    { label: 'Programs' },
    { label: 'Edit Program' }
];

export default function EditProgram() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate(); 
    const [checkedStatus, setCheckedStatus] = useState(false);
    const [checkedSequential, setCheckedSequential] = useState(false);
    const [programName, setProgramName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [selectedProgram, setSelectedProgram] = useState<any>(null);

    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/programs/${id}`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched Program Data:', data); 

                if (data) {
                    setSelectedProgram(data);
                    setProgramName(data.program_name || '');
                    setCheckedStatus(data.status === 'Live');
                    setStartDate(data.program_start_date || '');
                    setEndDate(data.program_end_date || '');
                    setShortDescription(data.program_short_description || '');
                    setDescription(data.program_description || '');
                    setCheckedSequential(data.sequential || false);
                } else {
                    console.error('No data found for the given ID:', id);
                }
            } catch (error) {
                console.error('Error fetching program data:', error);
            }
        };

        fetchProgramData();
    }, [id]); 

    const handleStatusChange = (value: boolean) => {
        setCheckedStatus(value);
    };

    const handleSequentialChange = (value: boolean) => {
        setCheckedSequential(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const programData = {
            program_name: programName,
            status: checkedStatus ? 1 : 0,
            program_start_date: startDate,
            program_end_date: endDate,
            program_short_description: shortDescription,
            program_description: description,
            sequential: checkedSequential
        };

        console.log('Program Data before submission:', programData);  

        try {
            const response = await fetch(`http://localhost:5000/api/programs/${id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(programData),
            });

            if (!response.ok) {
                throw new Error('Failed to update program');
            }

            const updatedProgram = await response.json();
            console.log('Updated Program:', updatedProgram);  

            navigate('/program');  

        } catch (error) {
            console.error('Error submitting program:', error);
        }
    };

     const handleRowClick = (program: any) => {
         setSelectedProgram(program);
        const programId = program._id;  
        console.log('Selected Program ID:', programId);  
        navigate(`/edit-program/${programId}`); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="program-container">
                <SideNav />
                <div className="main-content">
                    <BreadCrumb model={breadcrumbItems} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h1>Edit Program</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <label htmlFor="programStatus">Status:</label>
                            <InputSwitch id="programStatus" checked={checkedStatus} onChange={(e) => handleStatusChange(e.value)} />
                            <span>{checkedStatus ? 'Live' : 'Draft'}</span>
                        </div>
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="firstname">Program Name</label>
                            <InputText id="firstname" className="w-full" value={programName} onChange={(e) => setProgramName(e.target.value)} />
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="startDate">Start Date</label>
                            <InputText id="startDate" type="date" className="w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="field col">
                            <label htmlFor="endDate">End Date</label>
                            <InputText id="endDate" type="date" className="w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="field col">
                        <label htmlFor="programShortDescription">Program Short Description</label>
                        <InputTextarea id="programShortDescription" className="w-full" rows={2} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    </div>

                    <div className="field col">
                        <label htmlFor="programDescription">Program Description</label>
                        <InputTextarea id="programDescription" className="w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
                        <h4>Sequential</h4>
                        <InputSwitch checked={checkedSequential} onChange={(e) => handleSequentialChange(e.value)} />
                        <div style={{ marginLeft: 'auto' }}>
                            <button type="submit" className="p-button p-component ">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
