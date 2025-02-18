import { BookController } from "@book/book.controller";
import { rateLimiter } from "@middlewares/rateLimiter.middleware";
import express, { type Router } from "express";

class BookRoutes {
  private router: Router;
  private bookController: BookController;

  constructor() {
    this.router = express.Router();
    this.bookController = new BookController();
  }

  public routes(): Router {
    this.router.post("/books", this.bookController.create);
    this.router.get("/books", rateLimiter(1, 500), this.bookController.list);
    this.router.get("/books/:book_id", rateLimiter(1, 500), this.bookController.get);
    this.router.patch("/books/:book_id", rateLimiter(1, 500), this.bookController.update);
    this.router.delete("/books/:book_id", this.bookController.delete);
    return this.router;
  }
}

export const bookRoutes = new BookRoutes();
