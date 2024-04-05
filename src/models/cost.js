//Define Mongoose schemas and models for cost items
const mongoose = require(`mongoose`);

const costSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_id: Number,
    year: Number,
    month: Number,
    day: Number,
    description: String,
    category: String,
    sum: Number
});

module.exports = mongoose.model(`Cost`, costSchema, `costs`);