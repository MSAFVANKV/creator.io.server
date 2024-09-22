import User from "../Modals/userModal.js";
import bcrypt from 'bcryptjs'
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // Store user info in session
    req.session.userId = user._id;
    req.session.isAuthenticated = true;
    // checkAuth();
    res.status(201).json({ message: "User Logged successfully", user: user });

  } catch (error) {
    console.log(error)
    res.status(400).json("Error registering user");
  }
};


export const checkAuth = (req, res) => {
    console.log(req.session.userId,':check auth')
    if (req.session.userId) {
      return res.status(200).json({ isAuthenticated: true });
    } else {
    console.log('not:check auth')

      return res.status(200).json({ isAuthenticated: false });
    }
  };

  export const logout = (req, res) => {
    try {
        req.session.destroy();
        console.log("user logged out successfully.");
        res.status(200).json({ msg: "user logged out successfully" });
    } catch (error) {
        console.log("Error signing out user: " + error);
        return res.status(500).send({ msg: "Couldn't log out." });
    }
};