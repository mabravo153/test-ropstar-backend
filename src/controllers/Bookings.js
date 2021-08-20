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
const Bookings_1 = __importDefault(require("../models/Bookings"));
const typeorm_1 = require("typeorm");
class Bookings {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            try {
                let bookings = yield typeorm_1.getRepository(Bookings_1.default).find({
                    relations: ["restoran"],
                });
                if (bookings.length) {
                    respuesta = {
                        code: 200,
                        msg: bookings,
                    };
                }
                else {
                    respuesta = {
                        code: 404,
                        msg: "not Bookings found",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: `internal server error ${error}`,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            try {
                let bookings = yield typeorm_1.getRepository(Bookings_1.default).count({
                    relations: ["restoran"],
                    where: {
                        date: "2021-04-01",
                        restoran: {
                            id: 4,
                        },
                    },
                });
                if (bookings) {
                    respuesta = {
                        code: 200,
                        msg: bookings,
                    };
                }
                else {
                    respuesta = {
                        code: 404,
                        msg: "not Bookings found",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: `internal server error ${error}`,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send("funciona desde bookings");
        });
    }
}
exports.default = Bookings;
//# sourceMappingURL=Bookings.js.map