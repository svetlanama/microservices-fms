import {Body, Controller, Get, Post} from '@nestjs/common';
import {DriversService} from "./drivers.service";
import { IDriver } from "./interfaces/driver.interface";

@Controller('drivers')
export class DriversController {

  constructor(private readonly driversService: DriversService) {}

  @Post('/')
  appTrip(@Body() driver: IDriver) {
    return this.driversService.addTrip(driver)
  }

  @Get('/')
  getList() {
    return this.driversService.getList();
  }
}
