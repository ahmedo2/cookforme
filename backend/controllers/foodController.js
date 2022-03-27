const asyncHandler = require("express-async-handler");
const Food = require("../models/Food");
const User = require("../models/User");

// @route   GET /api/foods
// @desc    Get food item
// @access  Public
exports.getFoodItems = asyncHandler(async (req, res) => {
  const foods = await Food.find({});
  res.status(200).json({ foods });
});

// @route   POST /api/foods/
// @desc    Post food item
// @access  Private
exports.addFoodItem = asyncHandler(async (req, res) => {
  const { foodName, price, category, tags, description, availableOn } =
    req.body;

  const chef = await User.findById(req.user.id);

  const food = await Food.create({
    chef: req.user.id,
    foodName,
    price,
    category,
    tags: JSON.parse(tags),
    description,
    availableOn: JSON.parse(availableOn),
    image: req.file.path,
  });

  if (food) {
    chef.menu.push(food);
    await chef.save();
  }

  res.status(201).json({ food });
});

// @route   PUT /api/foods/:id
// @desc    Edit food item
// @access  Private
exports.updateFoodItem = asyncHandler(async (req, res) => {
  let food = await Food.findById(req.params.id);

  if (!food) {
    res.status(404);
    throw new Error("Dieses Essen gibt es nicht");
  }

  if (food.chef.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Sie können auf diese Route nicht zugreifen");
  }

  req.body.image = req.file ? req.file.path : food.image;
  req.body.tags = req.body.tags && JSON.parse(req.body.tags);
  req.body.availableOn =
    req.body.availableOn && JSON.parse(req.body.availableOn);

  food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(food);
});

// @route   DELETE /api/foods/:id
// @desc    Delete food item
// @access  Private
exports.deleteFoodItem = asyncHandler(async (req, res) => {
  let food = await Food.findById(req.params.id);

  if (!food) {
    res.status(404);
    throw new Error("Dieses Essen gibt es nicht");
  }

  if (food.chef.toString() !== req.user.id.toString()) {
    res.status(401);
    throw new Error("Sie können auf diese Route nicht zugreifen");
  }

  food = await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Mahlzeit erfolgreich gelöscht" });
});
