import {Body, Controller, Get, Post} from '@nestjs/common';
import {TripsService} from "./trips.service";
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {ITrip} from "./interfaces/trip.interface";


@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'fleet',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'b-consumer'
      }
    }
  })
  client: ClientKafka;


  async onModuleInit() {
    this.client.subscribeToResponseOf('add.new.trip');

    await this.client.connect();
  }

  @Post('/')
  appTrip(@Body() trip: ITrip) {
    this.tripsService.addTrip(trip)
    return this.client.send('add.new.trip', trip);
  }

  @Get('/')
  getList() {
    return this.tripsService.getList();
  }
}
