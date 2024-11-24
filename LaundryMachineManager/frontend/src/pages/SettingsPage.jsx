import ButtonLarge from "../components/global/ButtonLarge";
import Navigator from "../components/global/Navigator";
import { useState } from "react";

// RETRIEVE NAME AND EMAIL FROM BACKEND

export default function SettingsPage() {
  const handleSave = (e) => {
    e.preventDefault();
    if (newPassword != checkNewPassword) {
      alert("New password does not match");
    }
    alert("Settings saved successfully!");
  };
  const [newName, setNewname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  return (
    <main className="flex h-screen">
      <Navigator className="w-[250px] h-screen fixed" />

      <div className="mt-16 ml-[300px] max-w-[1000px] flex-1 flex flex-col h-full">
        <h1>Settings</h1>
        <form onSubmit={handleSave}>
          <div className="flex flex-row">
            <div className="w-1/2 mr-5 mb-5">
              <section className="w-full p-4 rounded-3xl bg-widget mb-5">
                <h2 className="mb-4">Profile Information</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <p>User ID</p>
                    <input
                      type="text"
                      disabled
                      value={"ENTER USER ID"}
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p>Full Name</p>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewname(e.target.value)}
                      placeholder="Enter your name"
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p>Email</p>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                </div>
              </section>
              <section className="p-4 rounded-3xl bg-widget">
                <h2 className="mb-4">Change Password</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <p>Current Password</p>
                    <input
                      type="password"
                      value={currPassword}
                      onChange={(e) => setCurrPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p>New Password</p>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p>Confirm New Password</p>
                    <input
                      type="password"
                      value={checkNewPassword}
                      onChange={(e) => setCheckNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                    />
                  </label>
                </div>
              </section>
            </div>
            <section className=" w-1/2 h-[200px] p-4 rounded-3xl bg-widget">
              <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                  <p>Current Residence</p>
                  {/* CHANGE TO DROP DOWN */}
                  <input
                    type="text"
                    placeholder="Change to Drop Down"
                    className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                  />
                </label>
                <label className="flex flex-col">
                  <p>New Card Number</p>
                  <input
                    type="text"
                    placeholder="Enter your new card number"
                    className="p-2 rounded focus:outline-none focus:ring focus:ring-black"
                  />
                </label>
              </div>
            </section>
          </div>
          <ButtonLarge type="submit" name={"Save"} />
        </form>
      </div>
    </main>
  );
}
