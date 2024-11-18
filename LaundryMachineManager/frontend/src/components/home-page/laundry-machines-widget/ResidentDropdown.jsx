import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
// I was thinking od making the open close logic a custom component, but we shall see

export default function ResidentDropdown({
  residences,
  chosenResidence,
  setChosenResidence,
}) {
  const [openDropDown, setOpenDropDown] = useState(false);

  const toggleDropDown = () => setOpenDropDown((prev) => !prev);

  return (
    <section className="relative min-w-fit w-[400px] mt-2">
      <div
        className="flex items-center justify-between rounded-lg cursor-pointer"
        onClick={toggleDropDown}
      >
        <p className="whitespace-nowrap">{chosenResidence.bname}</p>
        {openDropDown ? <IoChevronUp size={24} /> : <IoChevronDown size={24} />}
      </div>

      {openDropDown && (
        <div className="absolute top-full w-full bg-gray-900 rounded-lg shadow-lg z-10">
          {residences.map((residence) => (
            <p
              className={`p-4 cursor-pointer rounded-lg ${
                residence.bid === chosenResidence.bid
                  ? "bg-gray-800 text-white"
                  : "text-gray-400"
              } hover:bg-gray-800 hover:text-white text-base`}
              onClick={() => {
                setChosenResidence(residence);
                toggleDropDown();
              }}
            >
              {residence.bname}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
