// Packages
import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import createLocaleMiddleware from "express-locale";

// Configs
// import config from "./config/config";
// import { successHandle, errorHandle } from "./config/morgan";

// Middlewares
import limiter from "./middlewares/rateLimiter.js";

// Utils
// import errorHandler from "./utils/errorHandler";
import AppError from "./utils/appError.js";

// Routes
import routes from "./routes/index.js";
import { sendErrorDev } from "./utils/errorHandler.js";
import { connectDB } from "./config/database.js";

const appUse = (app) => {
  // Connect to MongoDB
  connectDB();

  // app.enable('trust proxy');

  // Morgan Handler
  // app.use(successHandle);
  // app.use(errorHandle);

  // Set security HTTP headers
  app.use(helmet());

  // Set Body parser, reading data from body into req.body
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Data sanitization against XSS
  // app.use(sanitizeInput);

  // Get the user's locale, and set a default in case there's none
  app.use(
    createLocaleMiddleware({
      priority: ["accept-language", "default"],
      default: "en_US",
    })
  );

  // Start polyglot and set the language in the req with the phrases to be used
  // app.use(startPolyglot);

  // Data sanitization against XSS
  app.use(xss());

  // MongoDB data sanitization
  app.use(mongoSanitize());

  // Implement CORS
  app.use(cors());
  app.options("*", cors());

  app.use(compression());

  // Prevents attackers from identifying the server framework
  app.disable("x-powered-by");

  // Limit Repeated Failed Requests to Auth Endpoints
  if (process.env.NODE_ENV === "production") {
    app.use("/api", limiter);
  }

  // API Routes
  app.use("/api", routes);

  // When someone access route that does not exist
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Error Handler
  app.use(sendErrorDev);
};
/**
 * Exports Express
 * @public
 */
export default appUse;
