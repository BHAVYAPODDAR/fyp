const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addCid = async (req, res) => {
  const { cid_value } = req.body;
  try {
    const user = await User.findById(req.user.id);

    // Calculate next sr
    const nextSr = user.cid.length > 0 ? user.cid[user.cid.length - 1].sr + 1 : 1;

    // Push new CID entry
    user.cid.push({ sr: nextSr, cid_value });

    await user.save();
    res.json({ msg: 'CID added successfully', cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
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

exports.getAllCidValues = async (req, res) => {
  try {
    const users = await User.find({}, 'cid'); // Get only the cid field

    const allCIDs = users.flatMap(user =>
      user.cid.map(item => ({
        userId: user._id,
        name: item.name,
        cid_value: item.cid_value
      }))
    );

    res.json(allCIDs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.checkCid = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.cid) return res.status(404).json({ msg: 'No CID found' });

    res.json({ cid: user.cid });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.saveQuestionnaire = async (req, res) => {
  const { questionnaire } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.questionnaire = questionnaire;
    await user.save();
    res.json({ msg: 'Questionnaire saved', questionnaire: user.questionnaire });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getQuestionnaire = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ questionnaire: user.questionnaire || {} });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
