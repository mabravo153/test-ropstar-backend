"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Bookings_1 = __importDefault(require("../controllers/Bookings"));
class Bookings {
    constructor() {
        this.routesBooking = express_1.Router();
        this.bookingController = new Bookings_1.default();
    }
    getRoutes() {
        this.routesBooking.get("/", this.bookingController.index);
        this.routesBooking.get("/count", this.bookingController.show);
        return this.routesBooking;
    }
}
exports.default = Bookings;
//# sourceMappingURL=Bookings.js.map