export default function LaundryCardDropdown({
  cards,
  chosenCard,
  setChosenCard,
}) {
  return (
    <div className="absolute top-full w-full bg-gray-900 rounded-lg shadow-lg z-10">
      {cards.map((card) => (
        <p
          key={card.cid}
          className={`p-4 cursor-pointer rounded-lg ${
            card.cid === chosenCard.cid
              ? "bg-gray-800 text-white"
              : "text-gray-400"
          } hover:bg-gray-800 hover:text-white`}
          onClick={() => setChosenCard(card)}
        >
          {card.cid}
        </p>
      ))}
    </div>
  );
}
