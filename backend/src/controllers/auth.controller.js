const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const foodpatnerModel = require('../models/foodpatner.model')

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET  // later move to .env
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}

async function logoutUser(req, res) {

  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully"
  });

}


async function registerfoodpatner(req, res) {
  try {
    console.log("Registering Food Partner:", req.body);
    const { fullName, email, password } = req.body;

    // 🔴 Validation first
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "fullName, email and password are required"
      });
    }

    const isUserAlreadyExists = await foodpatnerModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodpatner = await foodpatnerModel.create({
      fullName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: foodpatner._id },
      process.env.JWT_SECRET   // or "secret" for now
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(201).json({
      message: "Food partner registered successfully",
      foodpatner: {
        _id: foodpatner._id,
        email: foodpatner.email,
        fullName: foodpatner.fullName
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}




async function loginFoodpatner(req, res) {
  try {
    const { email, password } = req.body;

    const foodpatner = await foodpatnerModel.findOne({ email });
    if (!foodpatner) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, foodpatner.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: foodpatner._id },
      process.env.JWT_SECRET  // later move to .env
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({
      message: "foodpatner logged in successfully",
      foodpatner: {
        _id: foodpatner._id,
        email: foodpatner.email,
        fullName: foodpatner.fullName
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}




function logoutFoodpatner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "foodpatner logged out successfully"
  });
}








module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerfoodpatner,
  loginFoodpatner,
  logoutFoodpatner

};
