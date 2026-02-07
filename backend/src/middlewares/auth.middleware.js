const foodpatenerModel = require("../models/foodpatner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "please login" });
    }
    try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const foodpatner = await foodpatenerModel.findById(decoded.id);
         if (!foodpatner) {
             return res.status(401).json({ message: "Unauthorized" });
         }
         req.foodpatner = foodpatner;
         next();

    }catch(err){
        return res.status(401).json({ message: "Unauthorized" });
    }
}



async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}


module.exports = {
    authMiddleware,
    authUserMiddleware
}
