const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const userRoutes = require("./routes/userLivesInRoute");
const buildingRoutes = require("./routes/buildingRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/api/users", userRoutes);
app.use("/api/buildings", buildingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
