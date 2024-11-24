const { supabaseServiceRole } = require("../supabaseClient");

const getLaundryMachines = async (req, res) => {
  try {
    const { bid } = req.params;
    const { data, error } = await supabaseServiceRole
      .from("residencelaundrymachine")
      .select("*")
      .eq("bid", bid);

    if (error) {
      return res.status(400).json({ error: "Failed to fetch laundry machines.", details: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = { getLaundryMachines };