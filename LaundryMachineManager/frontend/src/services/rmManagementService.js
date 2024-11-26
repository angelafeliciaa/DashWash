export const getRmDashBoardUsers = async (
  name,
  email,
  buildingName,
  cardNum,
  orderBy
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
          uname: resp.name,
          uemail: resp.umail,
          bid: resp.campusresidence.bid,
          bname: resp.campusresidence.bname,
          address: resp.campusresidence.address,
          cid: resp.loadswashingcard.cid,
        };
      });
    }
  } catch (err) {
    console.error("Login failed", err.message);
    throw err;
  }
};
