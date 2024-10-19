import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import '../App.css'
import SideNav from './SideNav';
import { Link } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem'; 
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

interface Program {
  _id: string; 
  program_name: string;
  program_start_date: string;
  program_end_date: string;
  status: string;
}
  
export default function Program() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/programs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      console.log('Status values:', data.map((program: Program) => program.status));
      setPrograms(data);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching programs:', error);
      setError(error.message);
    }
  };

  const columns = [
    { key: 'program_name', header: 'Program Name' },
    { key: 'program_start_date', header: 'Start Date' },
    { key: 'program_end_date', header: 'End Date' },
    { key: 'status', header: 'Status' },
  ];

  const breadcrumbItems: MenuItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Programs' }
  ];

  const handleAddProgram = () => {
    console.log('Add new program');
  };

  const handleEdit = (program: Program) => {
    navigate(`/edit-program/${program.program_name}`); 
  };    

  const handleDuplicate = (program: Program) => {
    console.log('Duplicate', program); 
  };

  const handleDelete = (program: Program) => {
    console.log('Delete', program); 
  };

  const actionBodyTemplate = (program: Program) => {
    return (
      <div>
        <Button 
          icon="pi pi-pencil" 
          onClick={() => handleEdit(program)} 
          className="p-button-rounded p-button-text" 
          aria-label="Edit" 
        />      
        <Button 
          icon="pi pi-copy" 
          onClick={() => handleDuplicate(program)} 
          className="p-button-rounded p-button-text" 
          aria-label="Duplicate" 
        />
        <Button 
          icon="pi pi-trash" 
          onClick={() => handleDelete(program)} 
          className="p-button-rounded p-button-text" 
          aria-label="Delete" 
        />
      </div>
    );
  };

  function handleRowClick(rowData: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="program-container">
      <SideNav />
      <div className="main-content">
        <BreadCrumb model={breadcrumbItems} />
        <h1>Programs</h1>
        {error && <div>Error: {error}</div>}
        {programs.length > 0 ? (
          <DataTable
            data={programs}
            columns={[
              ...columns,
              { key: 'actions', header: 'Actions', body: actionBodyTemplate }
            ]}
            onAddClick={handleAddProgram}
            onRowClick={handleRowClick}
          />
        ) : (
          <p>No programs found. Please fetch programs.</p>
        )}
      </div>
    </div>
  );
}
