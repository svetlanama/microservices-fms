import {Body, Controller, Get, Post} from '@nestjs/common';
import {CarsService} from "./cars.service";
import {ICar} from "./interfaces/car.interface";


@Controller('cars')
export class CarsController {

  constructor(private readonly carsService: CarsService) {}

  @Post('/')
  appCar(@Body() car: ICar) {
    return this.carsService.addCar(car);
  }

  @Get('/')
  getList() {
    return this.carsService.getList();
  }
}
