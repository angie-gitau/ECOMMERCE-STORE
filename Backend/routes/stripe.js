// Backend/routes/stripe.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../models/order.model.js"; // Your order model path
import User from "../models/user.model.js";   // Your user model path

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

// Route 1: Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  const { cart, email, name, shipping, total } = req.body;

  try {
    // Validate inputs
    if (
      !cart ||
      !Array.isArray(cart.products) ||
      cart.products.length === 0 ||
      !email ||
      !name ||
      typeof shipping !== "number" ||
      typeof total !== "number"
    ) {
      return res.status(400).json({ message: "Invalid request body." });
    }

    // Convert products to Stripe line items
    const lineItems = cart.products.map((product) => ({
      price_data: {
        currency: "kes",
        product_data: {
          name: product.title,
          description: product.desc || "",
          images: [product.img || ""],
        },
        unit_amount: Math.round(product.discountedPrice * 100), // amount in cents
      },
      quantity: product.quantity,
    }));

    // Add shipping as a separate line item
    lineItems.push({
      price_data: {
        currency: "kes",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(shipping * 100),
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/myorders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        customer_name: name,
        email,
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("⚠️ Stripe session error:", error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// Route 2: Verify Stripe session and create order in DB
router.post("/verify-session", async (req, res) => {
  const { sessionId } = req.body;

  try {
    // Retrieve session from Stripe with expanded line_items and customer
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });

    if (!session.payment_status || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed." });
    }

    // Extract customer details
    const customerEmail = session.customer_details.email;
    const customerName = session.metadata?.customer_name || session.customer_details.name || "";

    // Find user by email
    const user = await User.findOne({ email: customerEmail });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Map Stripe line items to order products format
    const products = session.line_items.data.map((item) => ({
      title: item.description,
      quantity: item.quantity,
      discountedPrice: item.amount_total / 100 / item.quantity,
      img: item.price.product.images?.[0] || "",
      desc: "",
    }));

    // Extract shipping and total cost from metadata or session object
    const shippingCost = Number(session.metadata?.shipping) || 0;
    const totalCost = Number(session.metadata?.total) || session.amount_total / 100;

    // Create new order document
    const newOrder = new Order({
      userId: user._id,
      products,
      name: customerName,
      email: customerEmail,
      shipping: shippingCost,
      total: totalCost,
      status: 1, // paid
      paymentId: session.payment_intent,
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(200).json({ message: "Order saved successfully." });
  } catch (error) {
    console.error("Stripe session verification error:", error);
    res.status(500).json({ message: "Failed to verify session." });
  }
});

export default router;
