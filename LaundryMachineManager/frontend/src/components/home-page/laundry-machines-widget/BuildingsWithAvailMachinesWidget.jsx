import { useState } from "react";
import ButtonSmall from "../../global/ButtonSmall";

export default function BuildingsWithAvailMachinesWidget() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [buildingsAvailMachine, setBuildingsAvailMachine] = useState([]);
  const toggleCardOpen = () => setIsCardOpen((prev) => !prev);

  const handleGetBuildingsWithAvailMachines = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/campusResidence/building-with-avail-machines`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setBuildingsAvailMachine(data);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Fetch failed:", err.message);
      throw err;
    }
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <ButtonSmall
          name="Check Buildings with Available Machines"
          onClick={() => {
            toggleCardOpen();
            handleGetBuildingsWithAvailMachines();
          }}
        />
      </div>

      {isCardOpen && (
        <div className="absolute top-full mt-2 w-full bg-black borderrounded-lg shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <small className="text-white">Available Machines</small>
          </div>

          {buildingsAvailMachine.length > 0 ? (
            buildingsAvailMachine.map((b, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-800 rounded-lg mb-2"
              >
                <span className="text-sm font-medium text-white">
                  Building: {b.building_name}
                </span>
                <span className="text-sm text-white">
                  Machines: {b.availablemachines}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">
              No available machines found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
