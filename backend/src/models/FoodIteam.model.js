const mongoose = require('mongoose');

const foodIteamSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        foodpatner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foodpatner',
            required: true
        }


    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('foodIteam', foodIteamSchema);
