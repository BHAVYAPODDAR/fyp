const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  addCid,
  replaceCid,
  checkCid,
  addQuestionnaireEntry,
  getMyQuestionnaire,
  getMyCidValues,
  deleteQuestionnaireEntry,
  verifyPassword,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUserProfile);
router.post("/add-cid", auth, addCid);
// router.put("/replace-cid", auth, replaceCid);
router.get("/check-cid", auth, checkCid);
router.post("/questionnaire", auth, addQuestionnaireEntry);
router.get("/questionnaire", auth, getMyQuestionnaire);
router.get("/all-cids", auth, getMyCidValues);
router.delete("/questionnaire/:timestamp", auth, deleteQuestionnaireEntry);
router.post("/verify-password", auth, verifyPassword);

module.exports = router;
