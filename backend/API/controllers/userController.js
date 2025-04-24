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
  const { cid_value } = req.body;
  try {
    const user = await User.findById(req.user.id);

    // Calculate next sr
    const nextSr =
      user.cid.length > 0 ? user.cid[user.cid.length - 1].sr + 1 : 1;

    // Push new CID entry
    user.cid.push({ sr: nextSr, cid_value });

    await user.save();
    res.json({ msg: "CID added successfully", cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// exports.replaceCid = async (req, res) => {
//   const { cid } = req.body;
//   try {
//     const user = await User.findById(req.user.id);
//     user.cid = cid;
//     await user.save();
//     res.json({ msg: 'CID replaced successfully', cid: user.cid });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

exports.getMyCidValues = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("cid");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.cid);
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

exports.addQuestionnaireEntry = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { entry } = req.body;

    // Ensure sr is not taken from frontend
    const cleanedEntry = { ...entry };
    delete cleanedEntry.sr;

    const nextSr = user.questionnaire.length + 1;
    const newEntry = { sr: nextSr, ...cleanedEntry };

    user.questionnaire.push(newEntry);
    await user.save();

    res.json({ msg: "Entry added", questionnaire: user.questionnaire });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteQuestionnaireEntry = async (req, res) => {
  try {
    const { timestamp } = req.body; // string timestamp

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Filter out the entry by direct string comparison
    const originalLength = user.questionnaire.length;
    user.questionnaire = user.questionnaire.filter(
      (entry) => entry.submissionTimestamp !== timestamp
    );

    if (user.questionnaire.length === originalLength) {
      return res.status(404).json({ msg: "No matching questionnaire found" });
    }

    await user.save();
    res.json({ msg: "Questionnaire entry deleted", questionnaire: user.questionnaire });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};




exports.getMyQuestionnaire = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("questionnaire");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ questionnaire: user.questionnaire || [] });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
