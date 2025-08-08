import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortCode = process.env.MPESA_SHORTCODE || "174379"; // Default sandbox shortcode
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl = process.env.MPESA_CALLBACK_URL;

// Get OAuth token from Safaricom with explicit text handling and error logging
async function getToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  try {
    const response = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const text = await response.text();
    console.log("Token response text:", text);

    if (!text) throw new Error("Empty token response");

    const data = JSON.parse(text);
    if (!data.access_token) throw new Error("No access_token in response");

    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}

// Generate timestamp in required format YYYYMMDDHHMMSS
function getTimestamp() {
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${YYYY}${MM}${DD}${HH}${mm}${ss}`;
}

// STK Push route
router.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount } = req.body;
    console.log("Received /stkpush request:", { phone, amount });

    if (!phone || !amount) {
      return res.status(400).json({ message: "Missing phone or amount in request" });
    }

    // Normalize phone format: Ensure starts with 254 (Kenya country code)
    let normalizedPhone = phone;
    if (phone.startsWith("0")) {
      normalizedPhone = "254" + phone.slice(1);
    } else if (!phone.startsWith("254")) {
      return res.status(400).json({ message: "Phone number must start with 254 or 0" });
    }

    const token = await getToken();
    console.log("Got token:", token);

    const timestamp = getTimestamp();
    console.log("Timestamp:", timestamp);

    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");
    console.log("Password:", password);

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: normalizedPhone,
      PartyB: shortCode,
      PhoneNumber: normalizedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "Test123",
      TransactionDesc: "Payment Test",
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const dataText = await response.text();
    console.log("Safaricom response text:", dataText);

    let data;
    try {
      data = JSON.parse(dataText);
    } catch (parseError) {
      console.error("Failed to parse Safaricom response JSON:", parseError);
      return res.status(500).json({ message: "Invalid response from Safaricom", raw: dataText });
    }

    if (!response.ok) {
      return res.status(400).json({ message: data.errorMessage || "STK Push failed", data });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error in /stkpush:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// M-Pesa Callback endpoint
router.post("/callback", (req, res) => {
  console.log("M-Pesa callback received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

export default router;
