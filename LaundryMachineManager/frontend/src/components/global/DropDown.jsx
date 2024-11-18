export default function DropDown({ items, chosenItem, setChosenItem }) {
  return (
    <div className="absolute top-full w-full bg-gray-900 rounded-lg shadow-lg z-10">
      {items.map((item) => (
        <p
          key={item.cid}
          className={`p-4 cursor-pointer rounded-lg ${
            item.cid === chosenItem.cid
              ? "bg-gray-800 text-white"
              : "text-gray-400"
          } hover:bg-gray-800 hover:text-white`}
          onClick={() => setChosenItem(item)}
        >
          {item.cid}
        </p>
      ))}
    </div>
  );
}
