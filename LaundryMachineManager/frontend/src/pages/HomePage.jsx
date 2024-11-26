import { useState, useEffect } from "react";
import WelcomeBackWidget from "../components/home-page/WelcomeBackWidget";
import FundsWidget from "../components/home-page/funds-widget/FundsWidget";
import Navigator from "../components/global/Navigator";
import CurrMachineWidget from "../components/home-page/CurrMachineWidget";
import CardDropdownWidget from "../components/home-page/CardDropdownWidget";
import CardHistoryWidget from "../components/home-page/card-history-widget/CardHistoryWidget";
import LaundryMachinesWidget from "../components/home-page/laundry-machines-widget/LaundryMachinesWidget";
import { useNavigate } from "react-router-dom";

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
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  const [cid, setCid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("defaultUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("User data from localStorage:", user);
      setUserData(user);

      const uid = user.uid;
      if (uid) {
        fetchCid(uid);
      } else {
        console.error("UID is undefined in user data");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchCid = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5001/washingCard/${uid}/cardID`);
      const data = await response.json();
      console.log("API Response Data:", data);
      if (response.ok) {
        setCid(data.cid);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Failed to fetch card ID:", err);
    }
  };

  if (!userData || cid === null) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-screen">
      {/* Navigation Sidebar */}
      <Navigator className="w-[250px] h-screen fixed" />

      {/* Main Content Area */}
      <div className="ml-[255px] flex-1 flex flex-row h-full ">
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
        <section className="ml-2 w-[500px] mt-2">
            <div className="flex items-center p-4 rounded-lg">
              <h1>Welcome Back!</h1>
            </div>
          </section>
        {/* <CardDropdownWidget uid={userData.uid} /> */}
          <div className="flex flex-row w-full min-h-[215px]">
            <WelcomeBackWidget uname={userData.name} />
            <FundsWidget uid={userData.uid} />
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
