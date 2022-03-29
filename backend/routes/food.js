const router = require("express").Router();

const {
  getFoodItems,
  getFoodItemsAdvanced,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/foodController");

const { auth, chefOnly } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", getFoodItems);
router.post("/advanced", getFoodItemsAdvanced);
router.post("/", auth, chefOnly, upload.single("image"), addFoodItem);
router.put("/:id", auth, chefOnly, upload.single("image"), updateFoodItem);
router.delete("/:id", auth, chefOnly, deleteFoodItem);

module.exports = router;
