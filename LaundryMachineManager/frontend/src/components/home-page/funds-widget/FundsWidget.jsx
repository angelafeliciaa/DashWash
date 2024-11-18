import { useState } from "react";
import ButtonLarge from "../../global/ButtonLarge";
import AddFundsModal from "./AddFundsModal";

export default function FundsWidget({ balance }) {
  const [bal, setBal] = useState(balance);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col items-start justify-between w-[250px] bg-widget p-5 rounded-3xl m-2">
      <div>
        <h1>Funds</h1>
        <h1>${bal}</h1>
      </div>
      <ButtonLarge name="Add Funds" onClick={openModal} />
      <AddFundsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setBal={setBal}
      />
    </section>
  );
}
