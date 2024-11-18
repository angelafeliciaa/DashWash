import { useState } from "react";
import WelcomeBackWidget from "../../components/home-page/WelcomeBackWidget";
import FundsWidget from "../../components/home-page/funds-widget/FundsWidget";
import Navigator from "../../components/global/Navigator";
import CurrMachineWidget from "../../components/home-page/CurrMachineWidget";
import CardDropdownWidget from "../../components/home-page/CardDropdownWidget";
import CardHistoryWidget from "../../components/home-page/card-history-widget/CardHistoryWidget";
import LaundryMachinesWidget from "../../components/home-page/laundry-machines-widget/LaundryMachinesWidget";
const washers = [
  {
    lid: 1,
    washing_status: "In Use",
    time_left: 15, // Time left in minutes
  },
  {
    lid: 2,
    washing_status: "open",
    time_left: null, // No time left if it's available
  },
  {
    lid: 3,
    washing_status: "In Use",
    time_left: 25,
  },
];

const dryers = [
  {
    lid: 4,
    washing_status: "open",
    time_left: null,
  },
  {
    lid: 5,
    washing_status: "In Use",
    time_left: 20,
  },
  {
    lid: 6,
    washing_status: "In Use",
    time_left: 30,
  },
];

const residences = [
  {
    bid: 0,
    bname: "Marine Drive Building 4",
    address: "2205 Lower Mall, Vancouver, BC V6T 1Z4",
  },
  {
    bid: 1,
    bname: "Fraser Hall Building 1",
    address: "6060 Thunderbird Blvd, Vancouver, BC V6T 1X7",
  },
];

const HomePage = () => {
  const [users, setUsers] = useState(null);
  const [buildings, setBuildings] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response) {
        throw new Error("net work bugging yo");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="flex h-screen">
      {/* Navigation Sidebar */}
      <Navigator className="w-[250px] h-screen fixed" />

      {/* Main Content Area */}
      <div className="ml-[255px] flex-1 flex flex-row h-full ">
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          <CardDropdownWidget
            cards={[
              { cid: 1111222233334444 },
              { cid: 2222111133334444 },
              { cid: 3333111122224444 },
            ]}
          />
          <div className="flex flex-row w-full min-h-[215px]">
            <WelcomeBackWidget uname="Leo Shang" />
            <FundsWidget balance={23.89} />
          </div>
          <div className="flex flex-row w-full min-h-[240px] mt-2">
            <CurrMachineWidget />
          </div>
          <div className="flex-1 overflow-y-auto mt-2">
            <CardHistoryWidget
              transactions={[
                { tid: 1, day: "2024-11-16", time: "14:30:00", price: 2 },
                { tid: 2, day: "2024-11-15", time: "10:00:00", price: 3 },
                { tid: 3, day: "2024-11-14", time: "08:45:00", price: 5 },
                { tid: 4, day: "2024-11-13", time: "20:15:00", price: 1 },
                { tid: 5, day: "2024-11-12", time: "16:30:00", price: 4 },
              ]}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-1 mt-[95px] max-w-[700px] ml-2">
          <LaundryMachinesWidget
            washers={washers}
            dryers={dryers}
            userDefaultResidence={{
              bid: 0,
              bname: "Marine Drive Building 4",
              address: "2205 Lower Mall, Vancouver, BC V6T 1Z4",
            }}
            residences={residences}
          />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
