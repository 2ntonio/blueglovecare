const moongose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = moongose.Schema({
  token: { type: String },
  name: { type: String, required: [true, "Please enter a name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a passowrd"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  } else {
    throw Error("Incorrect email");
  }
};

const User = moongose.model("user", userSchema);
module.exports = { User };
