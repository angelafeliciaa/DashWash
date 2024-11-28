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

    let selectQuery = "";
     if (laundryMachineColumns.length > 0) {
       selectQuery += `${laundryMachineColumns.join(", ")}`;
     }
     if (residenceColumns.length > 0) {
       if (selectQuery) {
         selectQuery += ", ";
       }
       selectQuery += `campusresidence(${residenceColumns.join(", ")})`;
     }

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

const getWashersByBid = async (req, res) => {
  try {
    const { bid } = req.body;
    const { data, error } = await supabaseServiceRole.rpc(
      "get_machines_with_washers_new",
      { input_bid: bid }
    );

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch Washers.",
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

const getDryersByBid = async (req, res) => {
  try {
    const { bid } = req.body;
    const { data, error } = await supabaseServiceRole.rpc(
      "get_machines_with_dryers_new",
      { input_bid: bid }
    );

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch Dryers.",
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

const getMachineCountsByBuilding = async (req, res) => {
  try {
    const { data, error } = await supabaseServiceRole.rpc(
      "get_machine_counts_by_building"
    );

    if (error) {
      console.error("Supabase RPC Error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server Error:", err);
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

const getFrequentlyUsedMachines = async (req, res) => {
  try {
    const { data, error } = await supabaseServiceRole.rpc(
      "get_frequently_used_machines"
    );

    if (error) {
      console.error("Supabase RPC Error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server Error:", err);
    res
      .status(500)
      .json({ error: "Internal server error.", details: err.message });
  }
};

module.exports = {
  getLaundryMachines,
  getRmLaundryMachines,
  getDryersByBid,
  getWashersByBid,
  getMachineCountsByBuilding,
  getFrequentlyUsedMachines,
};
