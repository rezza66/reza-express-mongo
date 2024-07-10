import passport from "passport";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "You must provide an email and a password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const loginController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
};

export const logoutController = (req, res) => {
  try {
    req.logout(function(err) {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Failed to logout' });
  }
};
