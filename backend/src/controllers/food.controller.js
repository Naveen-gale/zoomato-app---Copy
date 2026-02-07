const FoodItem = require('../models/foodIteam.model');
const foodpatnerModel = require('../models/foodpatner.model');


const { uploadFile } = require('../services/Storage.service'); // 👈 correct
const { v4: uuidv4 } = require("uuid");

async function createFood(req, res) {
  console.log(req.foodpatner);
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUploadResult = await uploadFile(
    req.file.buffer,
    `${uuidv4()}.mp4`
  );

  const foodItem = await FoodItem.create({
    name: req.body.name,
    video: fileUploadResult.url,
    description: req.body.description,
    foodpatner: req.foodpatner._id
  })
  res.status(201).json({ message: "food created successfully", foodItem: foodItem });
  console.log(fileUploadResult);
}

async function getFood(req, res) {
  const foodItems = await FoodItem.find({});
  res.status(200).json({ message: "food fetched successfully", foodItems: foodItems });
}
module.exports = {
  createFood,
  getFood

};
