import { Router } from "express";
import RestorantController from "../controllers/Restorants";

class Restorants {
  private routesRestoran = Router();
  private restorantController: RestorantController = new RestorantController();

  getRoutes(): Router {
    this.routesRestoran.get("/", this.restorantController.index);
    this.routesRestoran.get("/:id", this.restorantController.show);
    this.routesRestoran.post("/", this.restorantController.store);
    this.routesRestoran.put("/:id", this.restorantController.update);
    this.routesRestoran.delete("/:id", this.restorantController.destroy);
    this.routesRestoran.post("/:id/bookings", this.restorantController.reserve);

    return this.routesRestoran;
  }
}

export default Restorants;
