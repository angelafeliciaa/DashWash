import { useState, useEffect } from "react";

const HomePage = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response) {
        throw new Error("net work bugging yo");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    //className="flex align-middle justify-center h-screen w-screen"
    <>
      <div>
        <div>{users ? users.map((user) => user.uname) : null}</div>
      </div>
    </>
  );
};

export default HomePage;
