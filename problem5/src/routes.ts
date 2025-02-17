import { bookRoutes } from "@book/book.routes";
import type { Application } from "express";
import express from "express";

const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    const router = express.Router();
    router.use(bookRoutes.routes());

    app.use(BASE_PATH, router);
  };
  routes();
};
