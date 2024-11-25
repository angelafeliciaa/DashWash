import { useState, useEffect } from "react";
import ButtonLarge from "../../global/ButtonLarge";
import AddFundsModal from "./AddFundsModal";

export default function FundsWidget({ uid }) {
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`http://localhost:5001/washingCard/${uid}`);
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalance();
  }, [uid]);

  const toggleOpenClose = () => setIsModalOpen((prev) => !prev);

  return (
    <section className="flex flex-col items-start justify-between w-[250px] bg-widget p-5 rounded-3xl">
      <div>
        <h1>Funds</h1>
        <h1>${balance.toFixed(2)}</h1>
      </div>
      <ButtonLarge name="Add Funds" onClick={toggleOpenClose} />
      {isModalOpen && (
        <AddFundsModal onClose={toggleOpenClose} setBal={setBalance} uid={uid} />
      )}
    </section>
  );
}
