"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Restorants_1 = __importDefault(require("../controllers/Restorants"));
class Restorants {
    constructor() {
        this.routesRestoran = express_1.Router();
        this.restorantController = new Restorants_1.default();
    }
    getRoutes() {
        this.routesRestoran.get("/", this.restorantController.index);
        this.routesRestoran.get("/:id", this.restorantController.show);
        this.routesRestoran.post("/", this.restorantController.store);
        this.routesRestoran.put("/:id", this.restorantController.update);
        this.routesRestoran.delete("/:id", this.restorantController.destroy);
        this.routesRestoran.post("/:id/bookings", this.restorantController.reserve);
        return this.routesRestoran;
    }
}
exports.default = Restorants;
//# sourceMappingURL=Restorants.js.map