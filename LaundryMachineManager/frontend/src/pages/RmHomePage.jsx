import Navigator from "../components/global/Navigator";
import UserManagerWidget from "../components/Rm-home-page/UserManagerWidget";

// const sample_users = [
//   {
//     uid: 1,
//     name: "John Doe",
//     email: "user1@example.com",
//     buildingName: "Building A",
//     buildingAddress: "123 Main St, Cityville",
//     card: "12334566654654",
//   },
//   {
//     uid: 2,
//     name: "Jane Smith",
//     email: "user2@example.com",
//     buildingName: "Building B",
//     buildingAddress: "456 Elm St, Townsville",
//     card: "92334566654654",
//   },
//   {
//     uid: 3,
//     name: "Alice Johnson",
//     email: "user3@example.com",
//     buildingName: "Building C",
//     buildingAddress: "789 Oak St, Villageville",
//     card: "82334566654654",
//   },
// ];

export default function RmHomePage() {
  return (
    <main className="flex h-screen">
      <Navigator isRm={true} className="w-[250px] h-screen fixed" />
      <div className="ml-[255px] flex-1 flex flex-row h-full ">
        <UserManagerWidget />
      </div>
    </main>
  );
}
