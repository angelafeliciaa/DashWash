export default function ButtonSmall({ name, onClick }) {
  <button
    className="text-white bg-black w-fit px-5 py-1 rounded-md"
    onClick={onClick}
  >
    {name}
  </button>;
}
