import { getRepository } from "typeorm";
import Bookings from "../models/Bookings";

class Helpers {
  static async validateBookingDay(dateConsult: string): Promise<boolean> {
    let bookingDay = await getRepository(Bookings).count({
      relations: ["restoran"],
      where: {
        date: dateConsult,
      },
    });

    if (bookingDay > 20) {
      return false;
    }

    return true;
  }

  static async validateBookingRestaurant(
    dateConsult: string,
    id: string
  ): Promise<boolean> {
    let bookingDayRestaurant = await getRepository(Bookings).count({
      relations: ["restoran"],
      where: {
        date: dateConsult,
        restoran: {
          id: id,
        },
      },
    });

    if (bookingDayRestaurant > 15) {
      return false;
    }

    return true;
  }
}

export default Helpers;
