export default function ButtonSmall({ name, onClick }) {
  return (
    <button
      className="text-small-xl w-full text-white bg-black px-2 py-[1px] rounded-md"
      onClick={onClick}
    >
      {name}
    </button>
  );
}
