const Team = require("../models/Team");
const path = require("path");
const fs = require("fs");

exports.createTeam = async (req, res) => {
  try {
    const { teamName, teamPoints } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Team image required" });
    }

    const team = new Team({
      teamName,
      teamPoints,
      teamImage: `/uploads/teams/${req.file.filename}`,
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, teamPoints } = req.body;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", team.teamImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      team.teamImage = `/uploads/teams/${req.file.filename}`;
    }

    team.teamName = teamName || team.teamName;
    team.teamPoints = teamPoints || team.teamPoints;

    await team.save();

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 🔴 delete image from uploads folder
    const imagePath = path.join(__dirname, "..", team.teamImage);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: "Team & image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};