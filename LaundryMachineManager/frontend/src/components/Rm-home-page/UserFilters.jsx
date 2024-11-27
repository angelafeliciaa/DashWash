import { useState } from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function UserFilters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    buildingName: "",
    cardNumber: "",
    orderBy: "uname",
    feedbackFilter: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
      ...(name === 'feedbackFilter' && checked ? { name: '', email: '' } : {}),
    }));
  };

  const handleApplyFilters = () => {
    if (filters.feedbackFilter) {
      // if feedbackFilter is true, reset other filters
      setFilters((prevFilters) => ({
        ...prevFilters,
        name: '',
        email: '',
      }));
    }
    onApplyFilters(filters);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-widget rounded-3xl  my-5">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleInputChange}
          disabled={filters.feedbackFilter}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Search by Email"
          value={filters.email}
          onChange={handleInputChange}
          disabled={filters.feedbackFilter}
          className="p-2 border border-gray-300 rounded-lg"
        />
        {/* <input
          type="text"
          name="buildingName"
          placeholder="Search by Building Name"
          value={filters.buildingName}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Search by Card Number"
          value={filters.cardNumber}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg"
        /> */}
      </div>

      <div className="flex items-center gap-8">
        <label className="text-small-xl">Order By:</label>
        <select
          name="orderBy"
          value={filters.orderBy}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          {/* <option value="buildingName">Building Name</option>
          <option value="cardNumber">Card Number</option> */}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-small-xl">
          <input
            type="checkbox"
            name="feedbackFilter"
            checked={filters.feedbackFilter}
            onChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          Show users who have filed feedback for all laundry machines in their building
        </label>
      </div>
      <div className="w-[100px] ml-auto">
        <ButtonSmall name="Search" onClick={handleApplyFilters} />
      </div>
    </div>
  );
}
