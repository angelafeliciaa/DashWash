import { useState, useEffect } from "react";
import MachineFilters from "./MachineFIlters";
import {
  getRmDashBoardMachines,
  getMachineCountsByBuilding,
  getFrequentlyUsedMachines,
} from "../../services/rmManagementService";

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
  const [machineCounts, setMachineCounts] = useState([]);
  const [frequentMachines, setFrequentMachines] = useState([]);
  const [selectedOption, setSelectedOption] = useState("default");

  const handleApplyFilters = ({ selectedColumns, selectedOption }) => {
    setSelectedColumns(selectedColumns);
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        if (selectedOption === "frequentMachines") {
          const data = await getFrequentlyUsedMachines();
          setFrequentMachines(data);
          setMachines([]);
          setMachineCounts([]);
        } else if (selectedOption === "machineCounts") {
          const data = await getMachineCountsByBuilding();
          setMachineCounts(data);
          setMachines([]);
          setFrequentMachines([]);
        } else {
          const data = await getRmDashBoardMachines(
            selectedColumns.lid,
            selectedColumns.buildingName,
            selectedColumns.brand,
            selectedColumns.model,
            selectedColumns.buildingAddress,
            selectedColumns.washingStatus
          );
          setMachines(data);
          setMachineCounts([]);
          setFrequentMachines([]);
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, [selectedColumns, selectedOption]);

  return (
    <section className="flex flex-col h-full gap-6 w-full bg-white p-6 rounded-3xl shadow-lg overflow-y-auto">
      <h1 className="text-2xl font-bold">Machine Management</h1>

      <MachineFilters onApplyFilters={handleApplyFilters} />

      <div className="overflow-x-auto">
        {selectedOption === "frequentMachines" &&
          frequentMachines.length > 0 && (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Building ID</th>
                  <th className="px-4 py-2">Building Name</th>
                  <th className="px-4 py-2">Machine ID</th>
                  <th className="px-4 py-2">Usage Count</th>
                </tr>
              </thead>
              <tbody>
                {frequentMachines.map((machine) => (
                  <tr key={`${machine.bid}-${machine.lid}`}>
                    <td>{machine.bid}</td>
                    <td>{machine.bname}</td>
                    <td>{machine.lid}</td>
                    <td>{machine.usage_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        {selectedOption === "machineCounts" && machineCounts.length > 0 && (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Building ID</th>
                <th className="px-4 py-2">Building Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Machine Count</th>
              </tr>
            </thead>
            <tbody>
              {machineCounts.map((building) => (
                <tr key={building.bid}>
                  <td>{building.bid}</td>
                  <td>{building.bname}</td>
                  <td>{building.address}</td>
                  <td>{building.machine_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedOption === "default" && machines.length > 0 && (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                {selectedColumns.lid && <th className="px-4 py-2">LID</th>}
                {selectedColumns.buildingName && (
                  <th className="px-4 py-2">Building Name</th>
                )}
                {selectedColumns.brand && <th className="px-4 py-2">Brand</th>}
                {selectedColumns.model && <th className="px-4 py-2">Model</th>}
                {selectedColumns.buildingAddress && (
                  <th className="px-4 py-2">Address</th>
                )}
                {selectedColumns.washingStatus && (
                  <th className="px-4 py-2">Washing Status</th>
                )}
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr>
                  {selectedColumns.lid && <td>{machine.lid}</td>}
                  {selectedColumns.buildingName && <td>{machine.bname}</td>}
                  {selectedColumns.brand && <td>{machine.brand}</td>}
                  {selectedColumns.model && <td>{machine.model}</td>}
                  {selectedColumns.buildingAddress && (
                    <td>{machine.address}</td>
                  )}
                  {selectedColumns.washingStatus && (
                    <td>{machine.washing_status}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
