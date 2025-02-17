import * as process from "node:process";
import { envalidCustom } from "@global/helpers/envalidCustom.helper";
import bunyan from "bunyan";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { url, bool, cleanEnv, num, port, str } from "envalid";
import type admin from "firebase-admin";

dotenv.config({});

interface IEnv {
  DATABASE_URI: string;
  PORT: number;
  NODE_ENV: string;
  CLIENT_URL: string;
  RATE_LIMIT_MAX_REQUESTS: number;
  RATE_LIMIT_WINDOW_MS: number;
}

export class Config {
  public env: IEnv;

  constructor() {
    this.env = cleanEnv(process.env, {
      DATABASE_URI: envalidCustom.notEmptyString(),
      PORT: port(),
      NODE_ENV: envalidCustom.notEmptyString(),
      CLIENT_URL: url(),
      RATE_LIMIT_MAX_REQUESTS: num(),
      RATE_LIMIT_WINDOW_MS: num(),
    });
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: "debug" });
  }
}

export const config: Config = new Config();
