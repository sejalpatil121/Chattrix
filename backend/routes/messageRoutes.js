const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

// const { sendMessage, allMessages } = require("../controllers/messageControllers");
// const { protect } = require("../middleware/authMiddleware");

module.exports = router;