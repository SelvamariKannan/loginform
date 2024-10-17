import React, { useState } from 'react';
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

interface ColumnDef {
  key: string;
  header: string;
}

interface DataTableProps {
  data: any[];
  columns: ColumnDef[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');

  return (
    <div>
      <div className="p-d-flex p-jc-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder="Search..."
            className="w-full"
          />
        </span>
      </div>
      <PrimeDataTable
        value={data}
        paginator
        rows={10}
        dataKey="_id"
        emptyMessage="No data found."
        globalFilter={globalFilter}
      >
        {columns.map((column) => (
          <Column
            key={column.key}
            field={column.key}
            header={column.header}
          />
        ))}
      </PrimeDataTable>
    </div>
  );
};

export default DataTable;
