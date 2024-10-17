import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

interface Program {
  _id: string;
  program_name: string;
  program_start_date: string;
  program_end_date: string;
  // Add other fields as needed
}
  
export default function Program() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  ];

  return (
    <div>
      <h1>Programs</h1>
      {error && <div>Error: {error}</div>}
      {programs.length > 0 ? (
        <DataTable data={programs} columns={columns} />
      ) : (
        <p>No programs found. Please fetch programs.</p>
      )}
    </div>
  );
}
