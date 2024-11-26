const { supabaseServiceRole } = require("../supabaseClient");

const loginDefaultUser = async (req, res) => {
  const { uemail, upassword } = req.body;
  if (!uemail || !upassword) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const { data: user, error } = await supabaseServiceRole
      .from("userlivesin")
      .select("*")
      .eq("uemail", uemail)
      .eq("upassword", upassword)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    return res.status(200).json({
      uid: user.uid,
      bid: user.bid,
      name: user.uname,
      email: user.uemail,
      password: user.upassword,
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserLivesIn = async (req, res) => {
  try {
    const { data, error } = await supabaseServiceRole
      .from("userlivesin")
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

const rmDashBoardUsers = async (req, res) => {
  try {
    // Does not include "Show users who have filed feedback for all laundry machines" yet
    const { name, email, buildingName, cardNum, orderBy } = req.body;

    let query = supabaseServiceRole
      .from("userlivesin")
      .select(`
        uid,
        uname,
        uemail,
        campusresidence (
          bid,
          bname,
          address
        ),
        loadswashingcard (
          cid
        )
      `);
      
    if (name && name.trim() !== "") {
        query = query.ilike("uname", `%${name.trim()}%`);
    }

    if (email && email.trim() !== "") {
      query = query.ilike("uemail", `%${email.trim()}%`);
    }

    if (buildingName && buildingName.trim() !== "") {
      query = query.ilike("campusresidence.bname", `%${buildingName.trim()}%`);
    }

    if (cardNum && cardNum.trim() !== "") {
      query = query.eq("loadswashingcard.cid", cardNum.trim());
    }

    // SELECT user.uid, user.uname, user.uemail, res.bid, res.bname, res.address, card.cid
    // FROM userlivesin user, campusresidence res, loadswashingcard card
    // WHERE user.bid = res.bid AND user.uid = card.uid
    if (cardNum) {
      query = query.eq("loadswashingcard.cid", cardNum);
    }

    query = query.order(orderBy || "uname", { ascending: true });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = {
  rmDashBoardUsers,
  loginDefaultUser,
  getUserLivesIn,
};
