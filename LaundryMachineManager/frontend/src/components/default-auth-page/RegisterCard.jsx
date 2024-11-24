import { useState } from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function RegisterCard({ toggle }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Registration Submitted");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <section className="flex flex-col justify-center items-center h-fit w-fit rounded-3xl p-10 bg-widget shadow-lg">
        <h1>Register</h1>
        <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <p>Email</p>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email"
              required
            />
          </label>

          <label className="flex flex-col">
            <p>Password</p>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col">
            <p>Confirm Password</p>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Re-enter password"
              minLength="8"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <ButtonSmall
            name={"Register"}
            type="submit"
            onClick={() => console.log("Register works")}
          />
          <small>
            Have an account?{" "}
            <span
              className=" text-blue-500 hover:underline whitespace-nowrap hover:cursor-pointer"
              onClick={toggle}
            >
              Log in
            </span>
          </small>
        </form>
      </section>
    </div>
  );
}
