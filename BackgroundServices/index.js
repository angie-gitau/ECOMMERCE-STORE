import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/db.js";
import cron from "node-cron";
import sendWelcomeMail from "./emailServices/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./emailServices/sendPendingOrderEmail.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//SCHEDULE SERVICES

const services = () => {
  cron.schedule("* * * * *", () => {
    sendWelcomeMail();
    sendPendingOrderEmail();
    sendDeliveredOrderEmail();
  });
};

const promotion = () => {
  cron.schedule("30 5 * * 5", () => {

    // SENDING PROMOTION EMAIL
  });
};

services();
promotion();

app.listen(PORT, () => {
  console.log(`Background services is running on port ${PORT}`);
  dbConnection();
});
