const { supabaseServiceRole } = require("../supabaseClient");

const loginDefaultUser = async (req, res) => {
  const { uemail, upassword } = req.body;
  if (!uemail || !upassword) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const { data: user, error } = await supabaseServiceRole
    .from('userlivesin')
    .select('*')
    .eq('uemail', uemail)
    .eq('upassword', upassword)
    .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    return res.status(200).json({
      uid: user.uid,
      bid: user.bid,         
      name: user.uname,      
      email: user.uemail,
      password: user.upassword
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

module.exports = {
  loginDefaultUser,
  getUserLivesIn,
};
