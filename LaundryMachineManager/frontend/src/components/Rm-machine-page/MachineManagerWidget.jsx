import { useState, useEffect } from "react";
import MachineFilters from "./MachineFIlters";
import { getRmDashBoardMachines } from "../../services/rmManagementService";

export default function MachineManagerWidget() {
  const [machines, setMachines] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({
    lid: true,
    buildingName: true,
    brand: true,
    model: true,
    buildingAddress: true,
    washingStatus: true,
  });

  const handleApplyFilters = (columns) => {
    setSelectedColumns(columns);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getRmDashBoardMachines(
          selectedColumns.lid,
          selectedColumns.buildingName,
          selectedColumns.brand,
          selectedColumns.model,
          selectedColumns.buildingAddress,
          selectedColumns.washingStatus
        );
        setMachines(data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, [selectedColumns]);

  return (
    <section className="flex flex-col h-full gap-6 w-full bg-white p-6 rounded-3xl shadow-lg overflow-y-auto">
      <h1 className="text-2xl font-bold">Machine Management</h1>

      <MachineFilters onApplyFilters={handleApplyFilters} />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              {selectedColumns.lid && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  LID
                </th>
              )}
              {selectedColumns.buildingName && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  Building Name
                </th>
              )}
              {selectedColumns.brand && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  Brand
                </th>
              )}
              {selectedColumns.model && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  Model
                </th>
              )}
              {selectedColumns.buildingAddress && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  Building Address
                </th>
              )}
              {selectedColumns.washingStatus && (
                <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                  Washing Status
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine.lid} className="hover:bg-gray-50">
                {selectedColumns.lid && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.lid}
                  </td>
                )}
                {selectedColumns.buildingName && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.bname}
                  </td>
                )}
                {selectedColumns.brand && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.brand}
                  </td>
                )}
                {selectedColumns.model && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.model}
                  </td>
                )}
                {selectedColumns.buildingAddress && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.address}
                  </td>
                )}
                {selectedColumns.washingStatus && (
                  <td className="px-4 py-2 text-small-xl text-gray-700">
                    {machine.washing_status}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
