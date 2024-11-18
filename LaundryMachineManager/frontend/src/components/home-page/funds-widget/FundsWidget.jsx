import { useState } from "react";
import ButtonLarge from "../../global/ButtonLarge";
import AddFundsModal from "./AddFundsModal";

export default function FundsWidget({ balance }) {
  const [bal, setBal] = useState(balance);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOpenClose = () => setIsModalOpen((prev) => !prev);

  return (
    <section className="flex flex-col items-start justify-between w-[250px] bg-widget p-5 rounded-3xl m-2">
      <div>
        <h1>Funds</h1>
        <h1>${bal}</h1>
      </div>
      <ButtonLarge name="Add Funds" onClick={toggleOpenClose} />
      {isModalOpen && (
        <AddFundsModal onClose={toggleOpenClose} setBal={setBal} />
      )}
    </section>
  );
}
