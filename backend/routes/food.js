const router = require("express").Router();

const {
  getFoodItems,
  getFoodItemsAdvanced,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getMyFoodItems,
} = require("../controllers/foodController");

const { auth, chefOnly } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", getFoodItems);
router.post("/advanced", getFoodItemsAdvanced);
router.post("/", auth, chefOnly, upload.single("image"), addFoodItem);
router.put("/:id", auth, chefOnly, upload.single("image"), updateFoodItem);
router.get("/:id", auth, chefOnly);
router.delete("/:id", auth, chefOnly, deleteFoodItem);
router.get("/my", auth, chefOnly, getMyFoodItems);

module.exports = router;
