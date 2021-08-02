const { Schema, model } = require("mongoose");
const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  available: { type: Boolean, default: true },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", //this should be the same name used when exporting the model
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
