//Define Mongoose schemas and models for users
const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
   id: Number,
   first_name: String,
   last_name: String,
   birthday: Date
});

module.exports = mongoose.model(`User`, userSchema, `users`);