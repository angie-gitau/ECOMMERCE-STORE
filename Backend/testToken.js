// testToken.js
import axios from "axios";

const consumerKey = "or7shwXctv4CnVP0QImHGgHHK7Pc77pZHSSOgn97DBvGSuSb"; // <-- use your real key
const consumerSecret = "ToeSnFB8OAGmaSvm0JaFZzKhGO7AiDpx2dpd4Mnpm7BPJOi9gVY1yWAEYARa1iR5"; // <-- use your real secret

const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const res = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    console.log("✅ Token:", res.data);
  } catch (error) {
    console.error("❌ Failed:", error.response?.data || error.message);
  }
};

getAccessToken();
