import { useState, useEffect } from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function EditUserModal({
  onClose,
  uname,
  uemail,
  buildingName,
  cardNumber,
}) {
  const [name, setName] = useState(uname);
  const [building, setBuilding] = useState(buildingName);
  const [buildings, setBuildings] = useState([]);
  const [cardNum, setCardNum] = useState(cardNumber);
  const [email, setEmail] = useState(uemail);
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

    setError("");
    setSuccess("");

    const updateData = {
      building, //bid
      name,
      email,
    };

    //     try {
    //       const response = await fetch("http://localhost:5001/", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(updateData),
    //       });

    //       const resData = await response.json();

    //       if (!response.ok) {
    //         console.error("Error details:", resData.details);
    //         throw new Error(resData.error || "Updating user failed.");
    //       }

    //       setSuccess("Updating user successful!");
    //     } catch (err) {
    //       console.error(err);
    //       setError(err.message || "An error occurred during updating user.");
    //     }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <section className="flex flex-col justify-center items-center h-fit w-fit rounded-3xl p-10 bg-widget shadow-lg">
        <h1>Edit</h1>
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
              onChange={(e) => {
                setBuilding(e.target.value);
              }}
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
            <span className="mb-1">Card #</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter card number"
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {success && <p className="text-green-500 text-sm">{success}</p>}

          <ButtonSmall name={"Done"} type="submit" onClick={onClose} />
        </form>
      </section>
    </div>
  );
}
