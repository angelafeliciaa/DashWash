const fs = require("fs");
const path = require("path");

const getBuildings = (req, res) => {
  const filePath = path.join(mkdir, "../sample-data", "/Building.json");
  console.log(filePath);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to read file Building.json" });
    }
    res.json(JSON.parse(data));
  });
};

module.exports = {
  getBuildings,
};
