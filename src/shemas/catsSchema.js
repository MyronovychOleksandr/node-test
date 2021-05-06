const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Cat name is required"],
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
      required: [true, "Cat age is required"],
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

catSchema.plugin(mongoosePaginate);

const Cats = mongoose.model("cats", catSchema);

module.exports = Cats;
