import { Config } from "@root/config";
import setupDatabase from "@root/setupDatabase";
import { CrudServer } from "@root/setupServer";
import express, { type Express } from "express";

class Application {
  public start(): void {
    this.loadConfig();
    setupDatabase();
    const app: Express = express();
    const server: CrudServer = new CrudServer(app);
    server.start();
  }

  private loadConfig(): void {
    new Config();
    // load config for firebase admin ...
  }
}

const application: Application = new Application();
application.start();
