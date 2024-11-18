import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import DropDown from "../global/DropDown";

export default function CurrLaundryCard({ cards }) {
  const [chosenCard, setChosenCard] = useState(cards[0]);
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <section className="relative ml-2 w-[500px] mt-2">
      <div
        className="flex items-center justify-between p-4 rounded-lg cursor-pointer"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <h1>Card - {chosenCard.cid}</h1>
        {openDropDown ? <IoChevronUp size={32} /> : <IoChevronDown size={32} />}
      </div>

      {openDropDown && (
        <DropDown
          items={cards}
          chosenItem={chosenCard}
          setChosenItem={(card) => {
            setChosenCard(card);
            setOpenDropDown(false);
          }}
        />
      )}
    </section>
  );
}
