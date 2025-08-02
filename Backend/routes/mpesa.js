import express from "express";
import axios from "axios";

const router = express.Router();

const consumerKey = "C4jQbDtUGlirmJOzj8Fznq7eyRquATIPMrtL1LBOV7QzxOYx";
const consumerSecret = "DvdxSi6pWIP9xgG7Z6DIZKSrMT0DDFJz6ckXNazdgbeW4jdcsGejYvCnMoGrGPiJ";
const shortcode = "174379"; // Safaricom test shortcode
const passkey = "bfb279f9aa9bdbcf15e97dd71a467cd2c90b1d4c1e5a1a4f6b1e5a1a4f6b1e5a"; // Safaricom test passkey

async function getAccessToken() {
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const res = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    return res.data.access_token;
  } catch (error) {
    console.error("Failed to get access token:", error.message);
    throw new Error("Failed to get access token");
  }
}

router.post("/stk-push", async (req, res) => {
  try {
    const { phone, cart, userId } = req.body;

    if (!phone || !/^2547\d{8}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number format" });
    }

    const amount = cart?.total > 0 ? cart.total : 1;

    const accessToken = await getAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: "https://800829b4d0dd.ngrok-free.app/api/v1/mpesa/callback",
      AccountReference: `Order-${userId}`,
      TransactionDesc: "Ecommerce Payment",
    };

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (stkRes.data.ResponseCode !== "0") {
      return res.status(400).json({ success: false, message: stkRes.data.ResponseDescription || "STK Push failed" });
    }

    res.json({ success: true, data: stkRes.data });
  } catch (error) {
    console.error("STK Push error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.errorMessage || error.message || "Payment initiation failed",
    });
  }
});

// Simulated in-memory order status store (for demo)
const ordersStatus = {};

router.post("/callback", (req, res) => {
  console.log("M-Pesa Callback received:", JSON.stringify(req.body, null, 2));

  const callbackData = req.body.Body?.stkCallback;
  if (callbackData) {
    const { CheckoutRequestID, ResultCode, ResultDesc } = callbackData;

    ordersStatus[CheckoutRequestID] = { ResultCode, ResultDesc, timestamp: new Date() };

    console.log(`Order ${CheckoutRequestID} status updated: ${ResultCode} - ${ResultDesc}`);
  }

  res.sendStatus(200);
});

export default router;
