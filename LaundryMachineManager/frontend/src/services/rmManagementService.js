export const getRmDashBoardUsers = async (
    name = "",
    email = "",
    buildingName = "",
    cardNum = "",
    orderBy = ""
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5001/userLivesIn/rmDashBoard`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, buildingName, cardNum, orderBy }),
        }
      );
      const data = await response.json();
      console.log("RM dashboard response data:", data);
  
      if (response.ok) {
        return data.map((resp) => {
          return {
            uid: resp.uid,
            name: resp.uname,
            email: resp.uemail,
            bid: resp.campusresidence.bid,
            buildingName: resp.campusresidence.bname,
            buildingAddress: resp.campusresidence.address,
            card: resp.loadswashingcard[0].cid,
          };
        });
      } else {
        throw new Error(data.message || "Failed to fetch users.");
      }
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      throw err;
    }
  };