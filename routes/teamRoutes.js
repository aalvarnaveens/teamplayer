const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  createTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const router = express.Router();

router.post("/create", upload.single("teamImage"), createTeam);
router.get("/get_all", getAllTeams);
router.put("/update/:id", upload.single("teamImage"), updateTeam);
router.delete("/delete/:id", deleteTeam);

module.exports = router;
