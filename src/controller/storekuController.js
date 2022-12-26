/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
const Storeku = require('../models/storeku');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/user');

cloudinary.config({
  cloud_name: 'dzhytb7mx',
  api_key: '571776825437267',
  api_secret: 'SWyfiJo1VOhsJzAgHVJt0LGeimk',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Storeku',
  },
});

const uploadImg = multer({ storage }).array('image', 12);

const createStoreku = async (req, res) => {
  const {
    code,
    title,
    surfaceArea,
    buildingArea,
    electricity,
    waterPump,
    bedroom,
    bathroom,
    transmission,
    type,
    year,
    color,
    plat,
    tax,
    fuel,
    category,
    address,
    city,
    description,
    price,
  } = req.body;

  const { user } = req;

  const userAccount = await User.findOne({
    _id: user._id,
  });

  if (userAccount === undefined) {
    res.status(400).json({
      error: true,
      message: 'Error',
    });
  }

  const urls = [];
  const { files } = req;
  for (const file of files) {
    const newPath = cloudinary.url(`${file.filename}.webp`, {
      width: 700, height: 600, crop: 'scale', quality: 70,
    });
    urls.push(newPath);
  }

  const newStoreku = new Storeku({
    code,
    title,
    surfaceArea,
    buildingArea,
    electricity,
    waterPump,
    bedroom,
    bathroom,
    transmission,
    type,
    year,
    color,
    plat,
    tax,
    fuel,
    category,
    address,
    city,
    description,
    price,
    image: urls,
  });

  const storeku = await newStoreku.save();

  res.status(201).json({
    success: true,
    data: storeku,
  });
};

const getAllStoreku = async (req, res) => {
  const storeku = await Storeku.find().sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    data: storeku,
  });
};

const getSemuaStoreku = async (req, res) => {
  const { user } = req;
  console.log(user);

  const userAccount = await User.findOne({
    id: user._id,
  });

  if (userAccount === undefined) {
    res.status(400).json({
      error: true,
      message: 'Error',
    });
  }

  const storeku = await Storeku.find().sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    data: storeku,
  });
};

const getStoreku = async (req, res) => {
  const { id } = req.params;

  const storeku = await Storeku.findOne({
    _id: id,
  });

  res.status(200).json({
    success: true,
    data: storeku,
  });
};

const editStoreku = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  const userAccount = await User.findOne({
    _id: user._id,
  });

  if (userAccount === undefined) {
    res.status(400).json({
      error: true,
      message: 'Error',
    });
  }

  const urls = [];
  const { files } = req;
  for (const file of files) {
    const newPath = cloudinary.url(`${file.filename}.webp`, {
      width: 700, height: 600, crop: 'scale', quality: 70,
    });
    urls.push(newPath);
  }

  const {
    code,
    title,
    surfaceArea,
    buildingArea,
    electricity,
    waterPump,
    bedroom,
    bathroom,
    transmission,
    type,
    year,
    color,
    plat,
    tax,
    fuel,
    category,
    address,
    city,
    description,
    price,
  } = req.body;

  const store = await Storeku.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        code,
        title,
        surfaceArea,
        buildingArea,
        electricity,
        waterPump,
        bedroom,
        bathroom,
        transmission,
        type,
        year,
        color,
        plat,
        tax,
        fuel,
        category,
        address,
        city,
        description,
        price,
        image: urls,
      },
    },
  );

  if (store) {
    res.status(201).json({
      success: true,
      data: store,
      message: 'Data berhasil diubah',
    });
  } else {
    res.status(400).json({
      error: true,
      message: 'Data gagal diubah',
    });
  }
};

const deleteStoreku = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const userAccount = await User.findOne({
    _id: user._id,
  });
  console.log(userAccount);

  if (userAccount === undefined) {
    res.status(400).json({
      error: true,
      message: 'Error',
    });
  }

  const storekuId = await Storeku.findOneAndDelete({
    _id: id,
  });

  if (storekuId) {
    res.send({
      success: true,
      message: 'Data berhasil dihapus',
    });
  }
};

module.exports = {
  uploadImg,
  createStoreku,
  getAllStoreku,
  getSemuaStoreku,
  getStoreku,
  editStoreku,
  deleteStoreku,
};