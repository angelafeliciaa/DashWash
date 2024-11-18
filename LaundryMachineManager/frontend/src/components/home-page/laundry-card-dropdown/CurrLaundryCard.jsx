import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5"; // React icons
import LaundryCardDropdown from "./LaundryCardDropdown";

export default function CurrLaundryCard({ cards }) {
  const [chosenCard, setChosenCard] = useState(cards[0]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section ref={dropdownRef} className="relative ml-2 w-[500px] mt-2">
      <div
        className="flex items-center justify-between p-4 rounded-lg cursor-pointer"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <h1>Card - {chosenCard.cid}</h1>
        {openDropDown ? <IoChevronUp size={32} /> : <IoChevronDown size={32} />}
      </div>

      {openDropDown && (
        <LaundryCardDropdown
          cards={cards}
          chosenCard={chosenCard}
          setChosenCard={(card) => {
            setChosenCard(card);
            setOpenDropDown(false);
          }}
        />
      )}
    </section>
  );
}
