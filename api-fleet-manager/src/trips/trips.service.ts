import { Injectable } from '@nestjs/common';
import { ITrip } from "./interfaces/trip.interface";

@Injectable()
export class TripsService {
  trips: Array<ITrip>;

  constructor() {
    this.trips = [];
  }

  addTrip(trip: ITrip): ITrip {
    this.trips.push(trip);
    return this.trips[this.trips.length - 1];
  }

  getList(): Array<ITrip> {
    return this.trips;
  }
}
