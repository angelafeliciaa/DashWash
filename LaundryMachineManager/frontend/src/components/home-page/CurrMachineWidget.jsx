import DryerCard from "../global/machine-cards/DryerCard";
import WasherCard from "../global/machine-cards/WasherCard";

export default function CurrMachineWidget({ machines }) {
  return (
    <section className="flex flex-col justify-start w-full bg-widget rounded-3xl p-5">
      <h1 className="mb-2">Current Machine Usage</h1>
      <div className="flex gap-4 overflow-x-auto">
        <DryerCard id={1} washingStatus="Available" timeLeft={12} />
        <WasherCard id={2} washingStatus="in use" timeLeft={32} />
      </div>
    </section>
  );
}
