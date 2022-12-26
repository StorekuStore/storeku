const { model, Schema } = require('mongoose');

const StorekuSchema = new Schema(
  {
    code: {
      type: String,
      // unique: true,
    },
    title: {
      type: String,
      // required: true,
    },
    surfaceArea: {
      type: String,
    },
    buildingArea: {
      type: String,
    },
    electricity: {
      type: String,
    },
    waterPump: {
      type: String,
    },
    bedroom: {
      type: String,
    },
    bathroom: {
      type: String,
    },
    transmission: {
      type: String,
    },
    type: {
      type: String,
    },
    year: {
      type: String,
    },
    color: {
      type: String,
    },
    plat: {
      type: String,
    },
    tax: {
      type: String,
    },
    fuel: {
      type: String,
    },
    category: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    image: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Storeku = new model('storeku', StorekuSchema);
module.exports = Storeku;
