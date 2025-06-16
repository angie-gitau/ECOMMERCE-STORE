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
  });
};

services();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnection();
});
