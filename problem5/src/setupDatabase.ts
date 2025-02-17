import { config } from "@root/config";
import type Logger from "bunyan";
import mongoose from "mongoose";

const log: Logger = config.createLogger("setupMongoDB");

export default function setupDatabase() {
  const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(config.env.DATABASE_URI)
      .then()
      .catch((error) => {
        log.error("MongoDB connection error:", error);
      });
  };

  mongoose.connection.on("connected", () => {
    log.info("Successfully connected to database.");
  });

  mongoose.connection.on("disconnected", () => {
    log.warn("MongoDB connection lost. Reconnecting...");
    connect();
  });

  connect();
}
