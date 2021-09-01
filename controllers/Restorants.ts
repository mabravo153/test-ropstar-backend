import { Request, Response } from "express";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import RestauransModel from "../models/Restorants";
import BookingsModel from "../models/Bookings";
import Helpers from "../helpers/Helpers";

class Restorans {
  async index(req: Request, res: Response): Promise<Response> {
    let { city, name } = req.query;
    let searchQuery: { [key: string]: any } = {};

    if (city !== undefined) {
      searchQuery["city"] = city;
    }

    if (name !== undefined) {
      searchQuery["name"] = name;
    }

    let respuesta;
    try {
      let restaurants = await getRepository(RestauransModel).find({
        where: searchQuery,
      });
      if (restaurants.length) {
        respuesta = {
          code: 200,
          msg: restaurants,
        };
      } else {
        respuesta = {
          code: 404,
          msg: "Restaurants Not Found",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
  async show(req: Request, res: Response): Promise<Response> {
    let { id } = req.params;
    let respuesta;
    try {
      let restaurant = await getRepository(RestauransModel).findOne(id);
      if (restaurant) {
        respuesta = {
          code: 200,
          msg: restaurant,
        };
      } else {
        respuesta = {
          code: 404,
          msg: "Restaurant Not Found",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
  async store(req: Request, res: Response): Promise<Response> {
    let respuesta;

    let { name, description, address, city, photo_url } = req.body;

    try {
      let restaurant = new RestauransModel();
      restaurant.name = name;
      restaurant.description = description;
      restaurant.address = address;
      restaurant.city = city;
      restaurant.photo_url = photo_url;

      const errors = await validate(restaurant);

      if (errors.length) {
        respuesta = {
          code: 400,
          msg: errors,
        };
      } else {
        await getRepository(RestauransModel).save(restaurant);
        respuesta = {
          code: 200,
          msg: "Restaurant Created",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
  async update(req: Request, res: Response): Promise<Response> {
    let respuesta;

    let { id } = req.params;
    let { name, description, address, city, photo_url } = req.body;

    try {
      let restaurantRepo = getRepository(RestauransModel);

      let restaurant = await restaurantRepo.findOne(id);

      if (!restaurant) {
        respuesta = {
          code: 404,
          msg: "Restaurant not fount",
        };
      } else {
        restaurant.name = name;
        restaurant.description = description;
        restaurant.address = address;
        restaurant.city = city;
        restaurant.photo_url = photo_url;

        const errors = await validate(restaurant);

        if (errors.length) {
          respuesta = {
            code: 400,
            msg: errors,
          };
        } else {
          await restaurantRepo.save(restaurant);
          respuesta = {
            code: 200,
            msg: "Restaurant updated",
          };
        }
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
  async destroy(req: Request, res: Response): Promise<Response> {
    let respuesta;

    let { id } = req.params;
    try {
      let restaurantRepo = getRepository(RestauransModel);

      let restaurant = await restaurantRepo.findOne(id);

      if (!restaurant) {
        respuesta = {
          code: 404,
          msg: "Restaurant not fount",
        };
      } else {
        await restaurantRepo.remove(restaurant);
        respuesta = {
          code: 200,
          msg: "Restaurant deleted",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
  async reserve(req: Request, res: Response): Promise<Response> {
    let respuesta;

    let { id } = req.params;
    let { date, customer_name, description } = req.body;

    try {
      let restaurantRepo = getRepository(RestauransModel);

      let restaurant = await restaurantRepo.findOne(id);

      if (!restaurant) {
        respuesta = {
          code: 404,
          msg: "Restaurant not fount",
        };
      } else {
        let validateDay = await Helpers.validateBookingDay(date);
        let validateRestaurant = await Helpers.validateBookingRestaurant(
          date,
          id
        );

        if (!validateDay || !validateRestaurant) {
          return res.status(400).json({
            code: 400,
            msg: "not posible booking",
          });
        }

        let booking = new BookingsModel();
        booking.customer_name = customer_name;
        booking.date = date;
        booking.description = description;
        booking.restoran = restaurant;

        const errors = await validate(booking);

        if (errors.length) {
          respuesta = {
            code: 400,
            msg: errors,
          };
        } else {
          await getRepository(BookingsModel).save(booking);
          respuesta = {
            code: 200,
            msg: "Booking created",
          };
        }
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: error,
      };
    }
    return res.status(respuesta.code).json(respuesta);
  }
}

export default Restorans;
