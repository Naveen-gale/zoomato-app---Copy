require('dotenv').config();   // 👈 FIRST LINE ALWAYS

const { connect } = require('mongoose');
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


console.log(process.env.IMAGEKIT_PUBLIC_KEY);
console.log(process.env.IMAGEKIT_PRIVATE_KEY);
console.log(process.env.IMAGEKIT_URL_ENDPOINT);
