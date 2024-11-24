import { useState, useEffect} from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function RegisterCard({ toggle }) {
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("http://localhost:5001/campusResidence");
        if (!response.ok) {
          throw new Error("Failed to fetch buildings");
        }
        const data = await response.json();
        setBuildings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load buildings. Please try again later.");
      }
    };

    fetchBuildings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!building) {
      setError("Please select a building.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("");

    const registrationData = {
      name,
      building, // bid
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5001/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const resData = await response.json();

      if (!response.ok) {
        console.error("Error details:", resData.details);
        throw new Error(resData.error || "Registration failed.");
      }

      setSuccess("Registration successful! You can now log in.");
      // reset fields
      setName("");
      setEmail("");
      setBuilding("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <section className="flex flex-col justify-center items-center h-fit w-fit rounded-3xl p-10 bg-widget shadow-lg">
        <h1>Register</h1>
        <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>

        <label className="flex flex-col">
            <span className="mb-1">Name</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Email</span>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1">Building</span>
            <select
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a building
              </option>
              {buildings.length > 0 ? (
                buildings.map((bldg) => (
                  <option key={bldg.bid} value={bldg.bid}>
                    {bldg.bname}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading buildings...
                </option>
              )}
            </select>
          </label>

          <label className="flex flex-col">
            <p>Password</p>
            <input
              type="password"
              autoComplete="on"
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
              autoComplete="on"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Re-enter password"
              minLength="8"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {success && <p className="text-green-500 text-sm">{success}</p>}

          <ButtonSmall
            name={"Register"}
            type="submit"
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
