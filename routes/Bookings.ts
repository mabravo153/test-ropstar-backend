import { Router } from "express";
import BookingsController from "../controllers/Bookings";

class Bookings {
  private routesBooking = Router();
  private bookingController: BookingsController = new BookingsController();

  getRoutes(): Router {
    this.routesBooking.get("/", this.bookingController.index);
    this.routesBooking.get("/count", this.bookingController.show);

    return this.routesBooking;
  }
}

export default Bookings;
