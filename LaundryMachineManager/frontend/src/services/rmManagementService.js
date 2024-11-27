export const getRmDashBoardUsers = async (
    name = "",
    email = "",
    buildingName = "",
    cardNumber = "",
    orderBy = ""
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5001/userLivesIn/rmDashBoard`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, buildingName, cardNumber, orderBy }),
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
            bid: resp.campusresidence.bid || "N/A",
            buildingName: resp.campusresidence.bname || "N/A",
            buildingAddress: resp.campusresidence.address || "N/A",
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
