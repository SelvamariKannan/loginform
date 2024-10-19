import React, { useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

interface ColumnDef {
  key: string;
  header: string;
  body?: (rowData: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: ColumnDef[];
  onAddClick: () => void;
  onRowClick: (rowData: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onAddClick, onRowClick }) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [rows, setRows] = useState<number>(5);
  const menu = React.useRef<Menu>(null);
  const navigate = useNavigate();

  const actionBodyTemplate = (rowData: any) => {
    return null; 
  };

  const handleEdit = (rowData: any) => {
    if (rowData && rowData._id) { 
      console.log('Navigating to edit program with ID:', rowData._id); 
      navigate(`/edit-program/${rowData._id}`); 
    } else {
      console.error('Invalid row data for editing:', rowData);
    }
  };
  const handleDuplicate = (rowData: any) => {
    console.log('Duplicate', rowData);
  };

  const handleDelete = (rowData: any) => {
    console.log('Delete', rowData);
  };

  const handleAddProgram = () => {
    navigate('/create-program');
  };

  return (
    <Card className="data-table-card">
      <div className="flex justify-content-between align-items-center mb-4">
        <span className="p-input-icon-left" style={{ width: '100%', maxWidth: '300px' }}>
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder="Search"
            style={{ width: '320%', height: '50px' }}
          />
        </span>
        <Button
          label="Add Program"
          icon="pi pi-plus"
          className="p-button-primary"
          onClick={handleAddProgram}
          style={{ width: '15%', height: '50px' }}
        />
      </div>
      <PrimeDataTable
        value={data}
        paginator
        rows={rows}
        dataKey="_id"
        emptyMessage="No data found."
        globalFilter={globalFilter}
        className="p-datatable-sm"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowsPerPageOptions={[5, 10, 20, 50]}
        rowClassName={() => 'custom-row-spacing'}
      >
        {columns.map((column) => (
          <Column
            key={column.key}
            field={column.key}
            header={column.header}
            body={column.body}
            sortable
            filter
            filterPlaceholder={`Search ${column.header}`}
            headerStyle={{ backgroundColor: '#f8f9fa' }}
          />
        ))}
        <Column 
          body={actionBodyTemplate} 
          exportable={false} 
          style={{ width: '4rem' }}
          headerStyle={{ backgroundColor: '#f8f9fa' }}
        />
      </PrimeDataTable>
    </Card>
  );
};

export default DataTable;
