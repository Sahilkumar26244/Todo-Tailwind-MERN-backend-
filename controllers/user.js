const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(300).json({ message: "Username already exist!" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have atleast 4 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignedIn successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server error" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return res
      .status(300)
      .json({ message: "Username or password is incorrect!" });
  }

  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "tsmTM") }];
      const token = jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d" });
      res.status(200).json({id:existingUser._id,token,message:"User Login Successfully!"})
    } else {
      return res.status(300).json({ message: "Invalid credentials!" });
    }
  });
};

module.exports = {
  userRegister,
  userLogin,
};
