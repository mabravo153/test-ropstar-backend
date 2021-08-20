"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config/config"));
const Restorants_1 = __importDefault(require("../routes/Restorants"));
const Bookings_1 = __importDefault(require("../routes/Bookings"));
class Server {
    constructor() {
        this.Routes = {
            restaurantes: "/api/v1/restaurants",
            reservas: "/api/v1/bookings",
        };
        this.app = express_1.default();
        this.port = Number(config_1.default.SERVER_PORT);
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`server up, port ${this.port}`);
        });
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.Routes.restaurantes, new Restorants_1.default().getRoutes());
        this.app.use(this.Routes.reservas, new Bookings_1.default().getRoutes());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield typeorm_1.createConnection();
                console.log("Base de datos conectada correctamente");
            }
            catch (error) {
                console.log(error);
                setTimeout(() => {
                    this.dbConnection();
                }, 5000);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map