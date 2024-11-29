import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ButtonLarge from "../../global/ButtonLarge";

export default function AddFundsModal({ onClose, setBal, uid }) {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handlePredefinedAmountClick = (amount) => {
    setCustomAmount("");
    setSelectedAmount(amount);
  };

  const handleSubmit = async () => {
    const amountToAdd = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amountToAdd && amountToAdd > 0) {
      try {
        const response = await fetch(`http://localhost:5001/washingCard/${uid}/addFunds`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amountToAdd }), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add funds");
        }

        const data = await response.json();
        
        setBal(data.balance); // Update the balance in the parent component
        setCustomAmount("");
        setSelectedAmount(null);
        setSuccessMessage("Funds added successfully!");
        setErrorMessage("");
        
        // Automatically close the modal after a short delay
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
        }, 2000);
      } catch (err) {
        console.error("Error adding funds:", err);
        setErrorMessage(err.message || "Failed to add funds");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid amount");
      setSuccessMessage("");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-5 rounded-xl w-96">
        <div className="flex justify-between items-center">
          <h1>Add Funds</h1>
          <button onClick={onClose}>
            <FaTimes className="text-p-gray" />
          </button>
        </div>
        <div className="mt-4">
          <p>Choose an amount to add:</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {[10, 20, 30, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => handlePredefinedAmountClick(amount)}
                className={`${
                  selectedAmount === amount
                    ? "bg-black text-white"
                    : "bg-gray-200"
                } p-2 rounded-md text-small-xl`}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <p className="block text-lg">Custom Amount:</p>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="mt-2 w-full p-2 border border-p-gray rounded-md"
              placeholder="Enter custom amount"
            />
          </div>

          {successMessage && (
            <div className="mt-4 text-green-500">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-500">
              {errorMessage}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <ButtonLarge name="Add Funds" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
