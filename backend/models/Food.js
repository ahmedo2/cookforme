const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodName: {
      type: String,
      required: [true, "Bitte geben Sie den Namen der Mahlzeit ein"],
    },
    price: {
      type: Number,
      required: [true, "Bitte geben Sie den Essenspreis ein"],
    },
    category: {
      type: String,
      required: [true, "Bitte geben Sie die Essenskategorie ein"],
    },
    tags: [String],
    image: {
      type: String,
      required: [true, "Bitte geben Sie das Essensbild ein"],
    },
    description: String,
    availableOn: {
      type: [String],
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Food = mongoose.model("Food", foodSchema);
