import { Module } from '@nestjs/common';

import { StatsController } from './stats/stats.controller';
import { CarsModule } from './cars/cars.module';
import { TripsModule } from './trips/trips.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [ CarsModule, TripsModule, DriversModule ],
  controllers: [ StatsController ],
  providers: [],
})
export class AppModule {}
