import { Injectable } from '@nestjs/common';
import { IDriver } from "./interfaces/driver.interface";

@Injectable()
export class DriversService {
  drivers: Array<IDriver>;

  constructor() {
    this.drivers = [];
  }

  addTrip(driver: IDriver): IDriver {
    this.drivers.push(driver);
    return this.drivers[this.drivers.length - 1];
  }

  getList(): Array<IDriver> {
    return this.drivers;
  }
}
