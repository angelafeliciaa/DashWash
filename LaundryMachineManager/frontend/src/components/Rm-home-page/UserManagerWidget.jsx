import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import EditUserModal from "./EditUserModal";

export default function UserManagerWidget({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (uid) => {
    console.log("Deleting user with UID:", uid);
  };

  return (
    <section className="flex flex-col h-full gap-6 w-full bg-white p-6 rounded-3xl shadow-lg overflow-y-auto">
      <h1 className="text-2xl font-bold">User Management</h1>

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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
                  <button
                    className="text-2xl p-2 text-blue-500"
                    onClick={() => handleEditUser(user)}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="text-2xl p-2 text-red-500"
                    onClick={() => handleDeleteUser(user.uid)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
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
        />
      )}
    </section>
  );
}
