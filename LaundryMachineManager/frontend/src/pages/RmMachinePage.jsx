import MachineManagerWidget from "../components/Rm-machine-page/MachineManagerWidget";
import Navigator from "../components/global/Navigator";

export default function RmMachinePage() {
  return (
    <main className="flex h-screen">
      <Navigator isRm={true} className="w-[250px] h-screen fixed" />
      <div className="ml-[255px] flex-1 flex flex-row h-full ">
        <MachineManagerWidget />
      </div>
    </main>
  );
}
