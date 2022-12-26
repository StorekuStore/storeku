const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: true,
      message: 'Login gagal, email atau password salah',
    });
  }

  const passwordUser = await bcrypt.compare(password, user.password);
  if (!passwordUser) {
    return res.status(400).json({
      error: true,
      message: 'Login gagal, email atau password salah',
    });
  }
  const generateToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header('auth', generateToken);
  return res.json({
    token: generateToken,
    success: true,
    message: 'Login berhasil',
  });
};

const logout = async (req, res) => {
  const { user } = req;
  const { token } = req;
  if (user.token !== token) {
    res.json({
      error: true,
      message: 'Error',
    });
  }
  res.json({
    success: true,
    message: 'Logout berhasil',
  });
};

module.exports = {
  login,
  logout,
};
