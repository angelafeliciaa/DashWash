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

export const getRmDashBoardMachines = async (
  lid,
  bname,
  brand,
  model,
  address,
  washing_status
) => {
  try {
    const response = await fetch(
      `http://localhost:5001/laundryMachines/rm-machines`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lid,
          bname,
          brand,
          model,
          address,
          washing_status,
        }),
      }
    );

    const data = await response.json();
    console.log("RM dashboard response data:", data);

    if (response.ok) {
      return data.map((resp) => {
        return {
          lid: resp.lid,
          bname: resp.campusresidence?.bname,
          brand: resp.brand,
          model: resp.model,
          address: resp.campusresidence?.address,
          washing_status: resp.washing_status,
        };
      });
    } else {
      throw new Error("Failed to fetch data from the server");
    }
  } catch (err) {
    console.error("Request failed", err.message);
    throw err;
  }
};

// {
//   "lid": true,
//   "bname": true,
//   "brand": false,
//   "model": true,
//   "address": true,
//   "washing_status": true
// }
