import { useState, useEffect } from "react";
import WasherCard from "../../global/machine-cards/WasherCard";
import DryerCard from "../../global/machine-cards/DryerCard";
import BuildingsWithAvailMachinesWidget from "./BuildingsWithAvailMachinesWidget";
export default function LaundryMachinesWidget() {
  const [building, setBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [washers, setWashers] = useState([]);
  const [dryers, setDryers] = useState([]);

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

  useEffect(() => {
    const handleGetWashersByBid = async (bid) => {
      try {
        const response = await fetch(
          `http://localhost:5001/laundryMachines/washer-by-bid`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bid }),
          }
        );

        const data = await response.json();
        console.log("Washer data:", data);

        if (response.ok) {
          setWashers(data);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error("Login failed", err.message);
        throw err;
      }
    };
    const handleGetDryersByBid = async (bid) => {
      try {
        const response = await fetch(
          `http://localhost:5001/laundryMachines/dryer-by-bid`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bid }),
          }
        );

        const data = await response.json();
        console.log("Washer data:", data);

        if (response.ok) {
          setDryers(data);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error("Login failed", err.message);
        throw err;
      }
    };
    if (!building) {
      handleGetWashersByBid(1);
      handleGetDryersByBid(1);
    } else {
      handleGetWashersByBid(parseInt(building));
      handleGetDryersByBid(parseInt(building));
    }
  }, [building]);

  return (
    <section className="flex flex-col w-full bg-widget rounded-3xl p-5">
      <h1>Laundry Machines</h1>
      <label className="flex flex-col ">
        <BuildingsWithAvailMachinesWidget />
        <p className="mb-1">Building</p>
        <select
          className="p-2 border bg-black text-white rounded-xl mb-10"
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
