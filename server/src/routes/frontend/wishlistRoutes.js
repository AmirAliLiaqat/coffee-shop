import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../controllers/frontend/wishlistController.js";
import { auth as authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.delete("/clear", clearWishlist);

export default router;
