const { supabaseServiceRole } = require("../supabaseClient");

const getLaundryMachines = async (req, res) => {
  try {
    const { bid } = req.params;
    const { data, error } = await supabaseServiceRole
      .from("residencelaundrymachine")
      .select("*")
      .eq("bid", bid);

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch laundry machines.",
        details: error.message,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

// check that its equal to bid -> residencelaundrymachine -> washer + dryer
const getDryersByBid = async (req, res) => {
  try {
    const { bid } = req.params;
    const { data, error } = await supabaseServiceRole
      .from("residencelaundrymachine")
      .select("*")
      .eq("bid", bid);

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch laundry machines.",
        details: error.message,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

const getWashersByBid = async (req, res) => {
  try {
    const { bid } = req.body;
    const { data, error } = await supabaseServiceRole
      .from("residencelaundrymachine")
      .select("*")
      .eq("bid", bid);
  } catch (err) {}
};
// {
//   "lid": true,
//   "bname": true,
//   "brand": false,
//   "model": true,
//   "address": true,
//   "washing_status": true
// }

//figure out later
//   "machineType": true,
const getRmLaundryMachines = async (req, res) => {
  try {
    const selectedColumns = req.body;

    const residenceColumns = [];
    const laundryMachineColumns = [];

    Object.entries(selectedColumns).forEach(([column, include]) => {
      if (include) {
        if (column === "bname" || column === "address") {
          residenceColumns.push(column);
        } else {
          laundryMachineColumns.push(column);
        }
      }
    });

    const selectQuery = `
      ${laundryMachineColumns.join(", ")}, 
      campusresidence(${residenceColumns.join(", ")})
    `;

    const { data, error } = await supabaseServiceRole
      .from("residencelaundrymachine")
      .select(selectQuery);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(500).send({ message: "Error fetching data" });
    }

    res.status(200).send(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { getLaundryMachines, getRmLaundryMachines };
