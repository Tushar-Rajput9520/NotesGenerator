import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  createCreditsOrder,
 
} from "../controllers/credit.controller.js";

const creditRouter = express.Router();

/**
 * Create Stripe Checkout Order
 * Protected Route
 */
creditRouter.post("/order", isAuth, createCreditsOrder);

/**
 * Stripe Webhook
 * ⚠ Do NOT use isAuth here
 * Stripe directly calls this route
 */


export default creditRouter;