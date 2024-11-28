const { supabaseServiceRole } = require("../supabaseClient");

const getBuildings = async (req, res) => {
  try {
    // fetch building data from CampusResidence
    const { data, error } = await supabaseServiceRole
      .from("campusresidence")
      .select("bid, bname");

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch building data.",
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

// !!! HAVING QUERY
// SELECT c.bname AS Building_Name,
// r.washing_status AS Status,
// COUNT(r.lid) AS AvailableMachines
// FROM ResidenceLaundryMachine r
// JOIN CampusResidence c ON c.bid = r.bid
// WHERE r.washing_status = 'Available'
// GROUP BY r.bid, c.bname, r.washing_status
// HAVING COUNT(r.lid) > 0;
const getBuildingsWithAvailMachines = async (req, res) => {
  try {
    const { data, error } = await supabaseServiceRole.rpc(
      "get_buildings_with_available_machines"
    );

    if (error) {
      return res.status(400).json({
        error: "Failed to fetch buildings with available machines.",
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

module.exports = { getBuildings, getBuildingsWithAvailMachines };
