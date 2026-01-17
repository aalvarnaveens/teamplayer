require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const teamRoutes = require("./routes/teamRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔴 DB CONNECT HERE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("DB Error ❌", err);
    process.exit(1);
  });

// routes
app.use("/api/team", teamRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
