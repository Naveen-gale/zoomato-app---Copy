// creating server


const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const foodroutes = require('./routes/food.routes');
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodroutes);

module.exports = app