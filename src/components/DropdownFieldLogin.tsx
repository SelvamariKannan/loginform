import React from "react";
import { Dropdown } from "primereact/dropdown";

interface Organization {
  name: string;
  code: string;
}

export default function Dropdownc({ selectedOrganization, setSelectedOrganization, invalid }: { selectedOrganization: string, setSelectedOrganization: (selectedOrganization: string) => void, invalid: boolean }) {
  const organizations: Organization[] = [
    { name: "Organization A", code: "ORG_A" },
    { name: "Organization B", code: "ORG_B" },
    { name: "Organization C", code: "ORG_C" },
    { name: "Organization D", code: "ORG_D" },
    { name: "Organization E", code: "ORG_E" },
  ];

  return (
    <div className="flex flex-column gap-2 mt-4">
      <label htmlFor="choose">Choose an Organization</label>
      <Dropdown
        value={selectedOrganization}
        onChange={(e) => setSelectedOrganization(e.value)}
        options={organizations}
        optionLabel="name"
        placeholder="Select an Organization"
        className={`w-10 ${invalid ? 'p-invalid' : ''}`} 
      />
    </div>
  );
}
