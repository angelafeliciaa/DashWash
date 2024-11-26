import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import EditUserModal from "./EditUserModal";
import UserFilters from "./UserFilters";
import ButtonSmall from "../global/ButtonSmall";
import { getRmDashBoardUsers } from "../../services/rmManagementService";

export default function UserManagerWidget() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    buildingName: "",
    cardNum: "",
    orderBy: "",
  });

  const toggleFilterOpen = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (uid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/delete-user/${uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
      }

      const data = await response.json();
      console.log(data.message);

      setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
    } catch (err) {
      console.error("Error deleting user:", err.message);
      setError("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
    console.log("Deleted user with UID:", uid);
  };

  const fetchUsers = async (appliedFilters) => {
    setError(null);
    try {
      const fetchedUsers = await getRmDashBoardUsers(
        appliedFilters.uname,
        appliedFilters.uemail,
        appliedFilters.buildingName,
        appliedFilters.cardNum,
        appliedFilters.orderBy
      );
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err.message || "Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers(filters);
  }, []);

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    fetchUsers(appliedFilters);
  };

  return (
    <section className="flex flex-col h-full gap-6 w-full bg-white p-6 rounded-3xl shadow-lg overflow-y-auto">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="border-b pb-4">
        <div className="w-[200px]">
          <ButtonSmall
            onClick={toggleFilterOpen}
            className="flex items-center gap-2 text-p-xl"
            name={isFilterOpen ? "Hide Filters" : "Show Filters"}
          />
        </div>

        {isFilterOpen && (
          <UserFilters onApplyFilters={handleApplyFilters} />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                UID
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Building Name
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Building Address
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Card #
              </th>
              <th className="px-4 py-2 text-small-xl font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.uid}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.buildingName}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.buildingAddress}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      {user.card}
                    </td>
                    <td className="px-4 py-2 text-small-xl text-gray-700">
                      <button
                        className="text-2xl p-2 text-blue-500"
                        onClick={() => handleEditUser(user)}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="text-2xl p-2 text-red-500"
                        onClick={() => handleDeleteUser(user.uid)}
                        disabled={isDeleting}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </table>
      </div>

      {selectedUser && (
        <EditUserModal
          onClose={handleCloseModal}
          uemail={selectedUser.email}
          uname={selectedUser.name}
          buildingName={selectedUser.buildingName}
          buildingAddress={selectedUser.buildingAddress}
          cardNumber={selectedUser.card}
        />
      )}
    </section>
  );
}
