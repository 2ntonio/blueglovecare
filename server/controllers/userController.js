const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Antonio Freeman Secret", async (err, decodedToken) => {
      if (err) {
        res.send(err.message);
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.send({ user });
        next();
      }
    });
  } else {
    res.send("No token available");
    next();
  }
};

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  if (err.message === "Incorrect email") {
    errors.email = "Incorrect email";
  }

  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Antonio Freeman Secret", {
    expiresIn: maxAge,
  });
};

module.exports.RegisterUser = (req, res, next) => {
  User.create(req.body)
    .then(async (data) => {
      const token = createToken(data._id);
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      data.token = token;
      data.save();
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 100000 });
      res.status(201).send({ data });
    })
    .catch((err) => {
      const errors = handleErrors(err);
      res.send({ errors });
    });
};

module.exports.LoginUser = async (req, res, next) => {
  try {
    const user = await User.login(req.body.loginEmail, req.body.loginPassword);
    res.cookie("jwt", user.token, { httpOnly: true, maxAge: maxAge * 100000 });
    res.status(200).send({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.send({ errors });
  }
};

module.exports.LogOutUser = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send();
};
