const express = require("express");
const foodController = require("../controllers/food.controller");
const { authMiddleware, authUserMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/food
router.post(
  "/",
  authMiddleware,
  upload.single("video"),   // 👈 video, because you are sending video
  foodController.createFood
);


// GET /api/food 
router.get("/", foodController.getFood);


module.exports = router;
