import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Restorants from "./Restorants";

@Entity()
class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDateString()
  date: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @ManyToOne(() => Restorants, (restoran) => restoran.bookings)
  restoran: Restorants;
}

export default Bookings;
