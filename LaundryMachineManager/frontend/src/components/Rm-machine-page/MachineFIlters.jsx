import { useState } from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function MachineFilters({ onApplyFilters }) {
  const [selectedColumns, setSelectedColumns] = useState({
    lid: true,
    buildingName: true,
    brand: true,
    model: true,
    buildingAddress: true,
    washingStatus: true,
  });

  const handleColumnChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [name]: checked,
    }));
  };

  const [selectedOption, setSelectedOption] = useState("default");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

    if (e.target.value !== "default") {
      const unselectedColumns = Object.keys(selectedColumns).reduce(
        (acc, column) => {
          acc[column] = false;
          return acc;
        },
        {}
      );
      setSelectedColumns(unselectedColumns);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters({ selectedColumns, selectedOption });
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-widget rounded-3xl my-5">
      <div className="flex flex-col gap-2 mt-4">
        <legend className="font-semibold">Select an Option:</legend>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="default"
            checked={selectedOption === "default"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Show Machine Details
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="frequentMachines"
            checked={selectedOption === "frequentMachines"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Show Most Frequently Used Machines
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="machineCounts"
            checked={selectedOption === "machineCounts"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Show Machine Counts by Building
        </label>
      </div>
      <fieldset
        disabled={selectedOption !== "default"}
        className="flex flex-wrap gap-4 mt-4"
      >
        <legend className="font-semibold">Choose Columns to Display:</legend>
        {Object.keys(selectedColumns).map((column) => (
          <label key={column} className="flex items-center gap-2 text-small-xl">
            <input
              type="checkbox"
              name={column}
              checked={selectedColumns[column]}
              onChange={handleColumnChange}
              className="h-4 w-4"
            />
            {column
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
        ))}
      </fieldset>

      <div className="w-[100px] ml-auto">
        <ButtonSmall name="Apply" onClick={handleApplyFilters} />
      </div>
    </div>
  );
}
