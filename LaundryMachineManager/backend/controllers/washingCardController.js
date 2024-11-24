const { supabaseServiceRole } = require("../supabaseClient");

const getWashingCardBalance = async (req, res) => {
  try {
    const { uid } = req.params;
    const { data, error } = await supabaseServiceRole
      .from("loadswashingcard")
      .select("balance")
      .eq("uid", uid)
      .single();

    if (error) {
      return res.status(400).json({ error: "Failed to fetch balance.", details: error.message });
    }

    res.status(200).json({ balance: data.balance });
  } catch (err) {
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

const updateWashingCardBalance = async (req, res) => {
  try {
    const { uid } = req.params;
    const { amount } = req.body;

    const { data, error } = await supabaseServiceRole
      .from("loadswashingcard")
      .select("balance")
      .eq("uid", uid)
      .single();

    if (error) {
      return res.status(400).json({ error: "Failed to fetch current balance.", details: error.message });
    }

    const newBalance = data.balance + amount;
    
    const { error: updateError } = await supabaseServiceRole
      .from("loadswashingcard")
      .update({ balance: newBalance })
      .eq("uid", uid);

    if (updateError) {
      return res.status(400).json({ error: "Failed to update balance.", details: updateError.message });
    }

    res.status(200).json({ balance: newBalance });
  } catch (err) {
    res.status(500).json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = { getWashingCardBalance, updateWashingCardBalance };
