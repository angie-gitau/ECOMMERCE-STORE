import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Stripe secret key from .env
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cart, email, name, shipping, total } = req.body;

  try {
    // ✅ Validate inputs
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

    // ✅ Convert products to Stripe line items
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

    // ✅ Add shipping as a separate line item
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

    // ✅ Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
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

export default router;
