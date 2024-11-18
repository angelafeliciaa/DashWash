import { useState, useEffect } from "react";
import WelcomeBackWidget from "../../components/home-page/WelcomeBackWidget";
import FundsWidget from "../../components/home-page/funds.jsx/FundsWidget";
import Navigator from "../../components/global/Navigator";
import CurrMachineWidget from "../../components/home-page/CurrMachineWidget";
import CurrLaundryCard from "../../components/home-page/laundry-card-dropdown/CurrLaundryCard";

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

  const fetchBuildings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/buildings");
      if (!response) {
        throw new Error("net work (building) bugging yo");
      }
      const data = await response.json();
      console.log(data);
      setBuildings(data);
    } catch (e) {
      setError(e.message);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  //   fetchBuildings();
  // }, []);
  // ml-[255px]
  return (
    <main className="flex w-screen">
      <Navigator className="w-[250px] h-screen fixed" />
      <div className="ml-[255px] flex-1">
        <CurrLaundryCard
          cards={[
            { cid: 1111222233334444 },
            { cid: 2222111133334444 },
            { cid: 3333111122224444 },
          ]}
        />
        <div className="w-full">
          <div className="w-1/2">
            <div className="flex flex-row w-full min-h-[215px]">
              <WelcomeBackWidget uname="Leo Shang" />
              <FundsWidget balance={23.89} />
            </div>
            <div className="flex flex-row w-full min-h-[240px]">
              <CurrMachineWidget />
            </div>
          </div>
        </div>
        <div>{users ? users.map((user) => user.uname) : null}</div>
        <div>
          {buildings ? buildings.map((building) => building.bname) : null}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
