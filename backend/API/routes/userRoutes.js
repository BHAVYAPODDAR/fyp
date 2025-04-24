const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  addCid,
  replaceCid,
  checkCid,
  saveQuestionnaire,
  getQuestionnaire,
  getAllCidValues,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUserProfile);
router.post("/add-cid", auth, addCid);
router.put("/replace-cid", auth, replaceCid);
router.get("/check-cid", auth, checkCid);
router.post("/questionnaire", auth, saveQuestionnaire);
router.get("/questionnaire", auth, getQuestionnaire);
router.get('/all-cids', getAllCidValues);

module.exports = router;
