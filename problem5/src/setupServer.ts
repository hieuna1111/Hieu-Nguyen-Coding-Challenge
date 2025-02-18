import http from "node:http";
import type Logger from "bunyan";
import compression from "compression";
import cors from "cors";
import { type Application, type NextFunction, type Request, type Response, json, urlencoded } from "express";
import helmet from "helmet";
import hpp from "hpp";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import * as process from "node:process";
import { CustomError, type IErrorResponse } from "@global/helpers/errorHandler.helper";
import { config } from "@root/config";
import applicationRoutes from "@root/routes";

const log: Logger = config.createLogger("server");

export class CrudServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.env.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      }),
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }

  private routeMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    // Handle 404 errors first
    app.all("*", (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction): void => {
      log.error(error);
      if (error instanceof CustomError) {
        res.status(HTTP_STATUS.OK).json(error.serializeErrors());
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          message: error.message || "Internal Server Error",
        });
      }
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(error);
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(config.env.PORT, () => log.info(`Server is running on port: ${config.env.PORT}`));
  }
}
