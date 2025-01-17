import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function CardDropdownWidget({ cards }) {
  const [chosenCard, setChosenCard] = useState(cards[0]);
  const [openDropDown, setOpenDropDown] = useState(false);

  const toggleDropDown = () => setOpenDropDown((prev) => !prev);

  return (
    <section className="relative ml-2 w-[500px] mt-2">
      <div
        className="flex items-center justify-between p-4 rounded-lg cursor-pointer"
        onClick={toggleDropDown}
      >
        <h1>Card - {chosenCard.cid}</h1>
        {openDropDown ? <IoChevronUp size={32} /> : <IoChevronDown size={32} />}
      </div>

      {openDropDown && (
        <div className="absolute top-full w-full bg-gray-900 rounded-lg shadow-lg z-10">
          {cards.map((card) => (
            <p
              className={`p-4 cursor-pointer rounded-lg ${
                card.cid === chosenCard.cid
                  ? "bg-gray-800 text-white"
                  : "text-gray-400"
              } hover:bg-gray-800 hover:text-white text-base`}
              onClick={() => {
                setChosenCard(card);
                toggleDropDown();
              }}
            >
              {card.cid}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
