import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Load credentials from .env
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortcode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl =
  process.env.MPESA_CALLBACK_URL ||
  "https://bab0abf2d82e.ngrok-free.app/api/v1/mpesa/callback";

// ✅ Function to get M-Pesa access token
const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  try {
    const res = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    console.log("✅ Access Token:", res.data.access_token);
    return res.data.access_token;
  } catch (error) {
    console.error(
      "❌ Access Token Error:",
      error.response?.data || error.message
    );
    throw new Error("Access token request failed");
  }
};
console.log("🔑 Consumer Key:", consumerKey);
console.log("🔐 Consumer Secret:", consumerSecret);


// ✅ STK Push Endpoint
router.post("/stk-push", async (req, res) => {
  try {
    const { phone, cart, userId } = req.body;

    // ✅ Validate phone
    if (!/^2547\d{8}$/.test(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    const amount = cart?.total > 0 ? cart.total : 1;
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    );
    const accessToken = await getAccessToken();

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: `Order-${userId}`,
      TransactionDesc: "Payment to Build Prime",
    };

    console.log("📦 Payload:", payload);

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("✅ STK Response:", stkRes.data);

    if (stkRes.data.ResponseCode !== "0") {
      return res.status(400).json({
        success: false,
        message: stkRes.data.ResponseDescription || "STK Push failed",
      });
    }

    return res.status(200).json({ success: true, data: stkRes.data });
  } catch (error) {
    console.error("❌ STK Push Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message:
        error.response?.data?.errorMessage ||
        error.message ||
        "STK Push failed",
    });
  }
});

// ✅ Callback endpoint
router.post("/callback", (req, res) => {
  console.log("📥 Callback Received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

export default router;
