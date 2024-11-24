export default function ButtonLarge({ name, onClick, type }) {
  return (
    <button
      className="text-p-xl text-white bg-black w-fit px-5 py-1 rounded-lg whitespace-nowrap"
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
}
