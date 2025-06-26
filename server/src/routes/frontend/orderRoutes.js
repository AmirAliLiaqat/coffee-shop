import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../../controllers/frontend/orderController.js";
import { auth as authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrderById);
router.put("/:orderId/status", updateOrderStatus);
router.put("/:orderId/cancel", cancelOrder);

export default router;
