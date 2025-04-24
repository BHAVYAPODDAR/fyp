const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body; // no name field

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addCid = async (req, res) => {
  const { cid } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.cid)
      return res
        .status(400)
        .json({ msg: "CID already exists. Use replace endpoint." });

    user.cid = cid;
    await user.save();
    res.json({ msg: "CID added successfully", cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.replaceCid = async (req, res) => {
  const { cid } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.cid = cid;
    await user.save();
    res.json({ msg: "CID replaced successfully", cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.checkCid = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.cid) return res.status(404).json({ msg: "No CID found" });

    res.json({ cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.saveQuestionnaire = async (req, res) => {
  const { questionnaire } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.questionnaire = questionnaire;
    await user.save();
    res.json({ msg: "Questionnaire saved", questionnaire: user.questionnaire });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getQuestionnaire = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ questionnaire: user.questionnaire || {} });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
