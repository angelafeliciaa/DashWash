export const handleLoginDefaultUser = async (uemail, upassword) => {
  try {
    const response = await fetch(
      `http://localhost:5001/userLivesIn/loginDefault`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uemail, upassword }),
      }
    );

    const data = await response.json();
    console.log("Login response data:", data);

    if (response.ok) {
      const userData = {
        uid: data.uid,
        bid: data.bid,
        name: data.uname,
        email: data.uemail,
        password: data.upassword
      };
      localStorage.setItem("defaultUser", JSON.stringify(userData));
      return userData;
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    console.error("Login failed", err.message);
    throw err;
  }
};
