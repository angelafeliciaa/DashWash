const { supabaseServiceRole } = require("../supabaseClient");

const getTransactionHistory = async (req, res) => {
    try {
      const { cid } = req.params;
      const { data, error } = await supabaseServiceRole
        .from("recordstransaction")
        .select("*")
        .eq("cid", cid);
  
      if (error) {
        return res.status(400).json({ error: "Failed to fetch transaction history.", details: error.message });
      }
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Internal server error.", details: err.message });
    }
  };
  
  module.exports = { getTransactionHistory };
  