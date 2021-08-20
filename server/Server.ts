import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import config from "../config/config";
import RestorantsRoutes from "../routes/Restorants";
import BookingsRoutes from "../routes/Bookings";

class Server {
  private app: express.Application;
  private port: number;
  private Routes: { [key: string]: string } = {
    restaurantes: "/api/v1/restaurants",
    reservas: "/api/v1/bookings",
  };

  constructor() {
    this.app = express();
    this.port = Number(config.SERVER_PORT);
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  run(): void {
    this.app.listen(this.port, () => {
      console.log(`server up, port ${this.port}`);
    });
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes(): void {
    this.app.use(this.Routes.restaurantes, new RestorantsRoutes().getRoutes());
    this.app.use(this.Routes.reservas, new BookingsRoutes().getRoutes());
  }

  async dbConnection(): Promise<void> {
    try {
      await createConnection();
      console.log("Base de datos conectada correctamente");
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this.dbConnection();
      }, 5000);
    }
  }
}

export default Server;
