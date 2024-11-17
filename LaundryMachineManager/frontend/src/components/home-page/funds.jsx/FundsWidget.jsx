import ButtonLarge from "../../global/ButtonLarge";

export default function FundsWidget({ balance }) {
  return (
    <section className="flex flex-col items-start justify-between w-[250px] bg-widget p-5 rounded-3xl m-2">
      <div>
        <h1>Funds</h1>
        <h1>${balance}</h1>
      </div>
      <ButtonLarge
        name="Add Funds"
        onClick={() => {
          console.log("Large Button Clicked");
        }}
      />
    </section>
  );
}
