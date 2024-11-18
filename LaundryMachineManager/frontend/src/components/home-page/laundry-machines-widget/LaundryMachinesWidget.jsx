import { useState } from "react";
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
  return (
    <section className="flex flex-col w-full bg-widget rounded-3xl p-5">
      <h1>Laundry Machines</h1>
      <ResidentDropdown
        residences={residences}
        chosenResidence={chosenResidence}
        setChosenResidence={setChosenResidence}
      />
      <small className="mb-10">{chosenResidence.address}</small>
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
