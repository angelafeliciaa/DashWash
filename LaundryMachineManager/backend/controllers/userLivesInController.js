const { supabaseServiceRole } = require("../supabaseClient");

const getUserLivesIn = async (req, res) => {
  try {
    const { data, error } = await supabaseServiceRole
      .from("UserLivesIn")
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = {
  getUserLivesIn,
};
