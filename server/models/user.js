const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter the name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "User with this email already exist"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: [6, "Min length of password should be biggest then 5"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      console.log("user", user);
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect email");
  }
};
const User = mongoose.model("user", userSchema);
module.exports = User;
