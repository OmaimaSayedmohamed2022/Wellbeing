// Disable SSL/TLS certificate validation (for development only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import appUse from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const serverPort = 5005;
const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello, Vercel!");
// });

async function bootStrap() {
  try {
    app.get("/api/greeting", (req, res) => {
      res.json({ greeting: "Hello from HealthCare Backend" });
    });
    // EXECUTE  appUse here
    appUse(app);

    /* Start server */
    const serverListen = app.listen(process.env.PORT || serverPort, () => {
      console.log(`
      ################################################
      🚀 Server listening on port: ${serverPort} 🚀
      ################################################
  `);
    });

    /* Handling rejection outside express */
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    /* Handling exception */
    const uncaughtException = (error) => {
      serverListen.close(() => {
        console.error(
          `The server was shut down due to uncaught exception: ${error.message}`
        );
        process.exit(1);
      });
    };

    process.on("uncaughtException", uncaughtException);

    /* Handle process termination signals */
    const shutdown = () => {
      serverListen.close(() => {
        console.log("The server is shutting down...");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.error(`An error occurred during startup: ${error.message}`);
    process.exit(1);
  }
  // return console.log(`${process.env.BASE_URL}login/member-password?`);
}

bootStrap();
