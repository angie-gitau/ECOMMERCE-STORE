import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await dbConnection();  // Wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);  // Exit process on failure
  }
}

startServer();
