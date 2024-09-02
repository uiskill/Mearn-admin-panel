const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const UserSchema = new Schema({
  fname: {
    type: String,
    // required: true,
  },
  lname: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  course: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


const User = mongoose.model("users", UserSchema);
module.exports = User;
