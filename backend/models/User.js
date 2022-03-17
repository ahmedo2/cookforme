const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "bitte tragen Sie Ihren vollen Namen ein"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Geben Sie bitte Ihre Email-Adresse ein"],
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      ],
    },
    password: String,
    phoneNumber: {
      type: String,
      required: [true, "Bitte geben sie ihre Telefonnummer ein"],
      match: [
        /[0-9]*\/*(\+49)*[ ]*(\([0-9]+\))*([ ]*(-|–)*[ ]*[0-9]+)*/,
        "Bitte geben Sie eine gültige Telefonnummer ein",
      ],
    },
    profilePic: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isChef: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    chefVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationDocument: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    menu: {
      monday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      tuesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      wednesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      thursday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      friday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      saturday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
      sunday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
      ],
    },
    pincode: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", userSchema);
