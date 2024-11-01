const fs = require("fs");
const path = require("path");

const getUserLivesIn = (req, res) => {
  const filePath = path.join(__dirname, "../sample-data", "UserLivesIn.json");
  console.log(filePath);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json(JSON.parse(data));
  });
};

module.exports = {
  getUserLivesIn,
};
