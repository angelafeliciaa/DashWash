import { useState, useEffect } from "react";
import ResidentDropdown from "./ResidentDropdown";
import WasherCard from "../../global/machine-cards/WasherCard";
import DryerCard from "../../global/machine-cards/DryerCard";

export default function LaundryMachinesWidget({
  washers,
  dryers,
  userDefaultResidence,
  residences,
}) {
  const [chosenResidence, setChosenResidence] = useState(userDefaultResidence);
  const [building, setBuilding] = useState("");
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("http://localhost:5001/campusResidence");
        if (!response.ok) {
          throw new Error("Failed to fetch buildings");
        }
        const data = await response.json();
        setBuildings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load buildings. Please try again later.");
      }
    };

    fetchBuildings();
  }, []);

  return (
    <section className="flex flex-col w-full bg-widget rounded-3xl p-5">
      <h1>Laundry Machines</h1>
      <label className="flex flex-col">
        <span className="mb-1">Building</span>
        <select
          className="p-2 rounded-xl bg-black focus:outline-none focus:ring text-white"
          value={building}
          onChange={(e) => {
            setBuilding(e.target.value);
          }}
          required
        >
          <option value="" disabled>
            Select a building
          </option>
          {buildings.length > 0 ? (
            buildings.map((bldg) => (
              <option key={bldg.bid} value={bldg.bid}>
                {bldg.bname}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading buildings...
            </option>
          )}
        </select>
      </label>
      <div className="overflow-y-auto">
        <div>
          <p className="mb-2">Washers</p>
          {/* time_left is not apart of the db!!! it will be dependant on the start time fo the laundry machine. washType and washSession will be used */}
          <div className="flex flex-wrap gap-4">
            {washers.map((washer) => (
              <WasherCard
                key={washer.lid}
                id={washer.lid}
                washingStatus={washer.washing_status}
                timeLeft={washer.time_left}
                onClick={() => console.log("Washer clicked:", washer.lid)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2">Dryers</p>
          <div className="flex flex-wrap gap-4">
            {dryers.map((dryer) => (
              <DryerCard
                key={dryer.lid}
                id={dryer.lid}
                washingStatus={dryer.washing_status}
                timeLeft={dryer.time_left}
                onClick={() => console.log("Dryer clicked:", dryer.lid)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
