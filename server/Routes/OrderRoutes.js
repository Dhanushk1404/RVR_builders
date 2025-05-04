import express from "express";
import { placeOrder, getAllOrders,getOrderHistory,updateOrderStatus } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);    
orderRouter.get("/", getAllOrders); 
orderRouter.get("/history", getOrderHistory);
orderRouter.put("/:id/status", updateOrderStatus);


export default orderRouter;
