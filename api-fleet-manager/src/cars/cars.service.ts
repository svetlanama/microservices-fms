import { Injectable } from '@nestjs/common';
import { ICar } from "./interfaces/car.interface";

@Injectable()
export class CarsService {
  cars: Array<ICar>;

  constructor() {
    this.cars = [];
  }

  addCar(car: ICar): ICar {
    this.cars.push(car);
    return this.cars[this.cars.length - 1];
  }

  getList(): Array<ICar> {
    return this.cars;
  }
}
