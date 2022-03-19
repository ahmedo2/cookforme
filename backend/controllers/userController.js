const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const generateJWT = require("../utils/generateJWT");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// @route   POST /api/users/register
// @desc    Registers an user
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isChef } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Benutzer existiert bereits. Bitte loggen Sie sich ein.");
  } else {
    const user = await User.create({
      name,
      email,
      password,
      isChef,
    });
    if (user) {
      const verificationToken = user.getVerificationToken();
      await user.save({ validateBeforeSave: false });

      const verificationUrl = `${req.protocol}://${req.get(
        "host"
      )}/verify/${verificationToken}`;

      const text = `Um Ihr Konto zu verifizieren, klicken Sie bitte hier: \n\n ${verificationUrl}`;

      try {
        sendEmail({
          toEmail: user.email,
          subject: "Bestätigung des Kontos",
          text,
        });
      } catch (err) {
        user.verificationToken = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500);
        throw new Error("E-Mail konnte nicht gesendet werden");
      }

      res.status(201).json({ user, token: generateJWT(user._id) });
    }
  }
});

// @route   POST /api/users/login
// @desc    Logs in an user
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.emailVerified) {
      res.status(401);
      throw new Error(
        "Bitte überprüfen Sie Ihr Konto, bevor Sie sich anmelden"
      );
    }
    if (user.isChef && !user.chefVerified) {
      res.status(401);
      throw new Error(
        "Ihr Konto wurde noch nicht genehmigt, bitte versuchen Sie es später erneut"
      );
    }
    res.json({ user, token: generateJWT(user._id) });
  } else {
    res.status(401);
    throw new Error("Ungültige E-Mail oder Passwort");
  }
});

// @route   PUT /api/users/verify/:verificationToken
// @desc    Verify email address
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res) => {
  const verificationToken = crypto
    .createHash("sha256")
    .update(req.params.verificationToken)
    .digest("hex");

  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(400);
    throw new Error("Ungültiges oder abgelaufenes Token.");
  }

  user.emailVerified = true;
  await user.save();

  res.json({
    message:
      "Ihre E-Mail wurde erfolgreich bestätigt. Bitte loggen Sie sich ein.",
  });
});

// @route   PUT /api/users/forgot-password
// @desc    Send password reset email with token
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("Benutzer nicht gefunden");
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  try {
    sendEmail({
      toEmail: user.email,
      subject: "CookForMe - Password reset",
      text: `Ihr Link zum Zurücksetzen des Passworts: ${resetUrl}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error("E-Mail konnte nicht gesendet werden");
  }

  res.json({ message: "E-Mail gesendet" });
});

// @route   PUT /api/users/reset-password/:resetToken
// @desc    Resets password
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Ungültiges oder abgelaufenes Token.");
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ user, token: generateJWT(user._id) });
});
