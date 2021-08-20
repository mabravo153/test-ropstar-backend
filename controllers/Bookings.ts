import { Request, Response } from "express";
import { validate } from "class-validator";
import BookingModel from "../models/Bookings";
import { getRepository } from "typeorm";

class Bookings {
  async index(req: Request, res: Response): Promise<Response> {
    let respuesta;
    try {
      let bookings = await getRepository(BookingModel).find({
        relations: ["restoran"],
      });

      if (bookings.length) {
        respuesta = {
          code: 200,
          msg: bookings,
        };
      } else {
        respuesta = {
          code: 404,
          msg: "not Bookings found",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: `internal server error ${error}`,
      };
    }

    return res.status(respuesta.code).json(respuesta);
  }

  async show(req: Request, res: Response): Promise<Response> {
    let respuesta;
    try {
      let bookings = await getRepository(BookingModel).count({
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
      } else {
        respuesta = {
          code: 404,
          msg: "not Bookings found",
        };
      }
    } catch (error) {
      respuesta = {
        code: 500,
        msg: `internal server error ${error}`,
      };
    }

    return res.status(respuesta.code).json(respuesta);
  }

  async store(req: Request, res: Response): Promise<Response> {
    return res.send("funciona desde bookings");
  }
}

export default Bookings;
