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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Restorants_1 = __importDefault(require("../models/Restorants"));
const Bookings_1 = __importDefault(require("../models/Bookings"));
const Helpers_1 = __importDefault(require("../helpers/Helpers"));
class Restorans {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            try {
                let restaurants = yield typeorm_1.getRepository(Restorants_1.default).find();
                if (restaurants.length) {
                    respuesta = {
                        code: 200,
                        msg: restaurants,
                    };
                }
                else {
                    respuesta = {
                        code: 404,
                        msg: "Restaurants Not Found",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let respuesta;
            try {
                let restaurant = yield typeorm_1.getRepository(Restorants_1.default).findOne(id);
                if (restaurant) {
                    respuesta = {
                        code: 200,
                        msg: restaurant,
                    };
                }
                else {
                    respuesta = {
                        code: 404,
                        msg: "Restaurant Not Found",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            let { name, description, address, city, photo_url } = req.body;
            try {
                let restaurant = new Restorants_1.default();
                restaurant.name = name;
                restaurant.description = description;
                restaurant.address = address;
                restaurant.city = city;
                restaurant.photo_url = photo_url;
                const errors = yield class_validator_1.validate(restaurant);
                if (errors.length) {
                    respuesta = {
                        code: 400,
                        msg: errors,
                    };
                }
                else {
                    yield typeorm_1.getRepository(Restorants_1.default).save(restaurant);
                    respuesta = {
                        code: 200,
                        msg: "Restaurant Created",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            let { id } = req.params;
            let { name, description, address, city, photo_url } = req.body;
            try {
                let restaurantRepo = typeorm_1.getRepository(Restorants_1.default);
                let restaurant = yield restaurantRepo.findOne(id);
                if (!restaurant) {
                    respuesta = {
                        code: 404,
                        msg: "Restaurant not fount",
                    };
                }
                else {
                    restaurant.name = name;
                    restaurant.description = description;
                    restaurant.address = address;
                    restaurant.city = city;
                    restaurant.photo_url = photo_url;
                    const errors = yield class_validator_1.validate(restaurant);
                    if (errors.length) {
                        respuesta = {
                            code: 400,
                            msg: errors,
                        };
                    }
                    else {
                        yield restaurantRepo.save(restaurant);
                        respuesta = {
                            code: 200,
                            msg: "Restaurant updated",
                        };
                    }
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            let { id } = req.params;
            try {
                let restaurantRepo = typeorm_1.getRepository(Restorants_1.default);
                let restaurant = yield restaurantRepo.findOne(id);
                if (!restaurant) {
                    respuesta = {
                        code: 404,
                        msg: "Restaurant not fount",
                    };
                }
                else {
                    yield restaurantRepo.remove(restaurant);
                    respuesta = {
                        code: 200,
                        msg: "Restaurant deleted",
                    };
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
    reserve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            let { id } = req.params;
            let { date, customer_name, description } = req.body;
            try {
                let restaurantRepo = typeorm_1.getRepository(Restorants_1.default);
                let restaurant = yield restaurantRepo.findOne(id);
                if (!restaurant) {
                    respuesta = {
                        code: 404,
                        msg: "Restaurant not fount",
                    };
                }
                else {
                    let validateDay = yield Helpers_1.default.validateBookingDay(date);
                    let validateRestaurant = yield Helpers_1.default.validateBookingRestaurant(date, id);
                    if (!validateDay || !validateRestaurant) {
                        return res.status(400).json({
                            code: 400,
                            msg: "not posible booking",
                        });
                    }
                    let booking = new Bookings_1.default();
                    booking.customer_name = customer_name;
                    booking.date = date;
                    booking.description = description;
                    booking.restoran = restaurant;
                    const errors = yield class_validator_1.validate(booking);
                    if (errors.length) {
                        respuesta = {
                            code: 400,
                            msg: errors,
                        };
                    }
                    else {
                        yield typeorm_1.getRepository(Bookings_1.default).save(booking);
                        respuesta = {
                            code: 200,
                            msg: "Booking created",
                        };
                    }
                }
            }
            catch (error) {
                respuesta = {
                    code: 500,
                    msg: error,
                };
            }
            return res.status(respuesta.code).json(respuesta);
        });
    }
}
exports.default = Restorans;
//# sourceMappingURL=Restorants.js.map