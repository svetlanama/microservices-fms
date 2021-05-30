import {Body, Controller, Get, Post} from '@nestjs/common';
import {SimulatorService} from "./simulator.service";

import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {IKafkaMessage} from "../interfaces/kafka-message.interface";

import {ICarState} from "./interfaces/carstate.interface";
import {ITrip} from "./interfaces/trip.interface";


@Controller('simulator')
export class SimulatorController {
   interval = undefined

   constructor(private readonly simulatorService: SimulatorService) {}

    @Client({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'fleet',
          brokers: ['localhost:9092'],
        },
      }
    })
    client: ClientKafka;

    async onModuleInit() {
      this.client.subscribeToResponseOf('add.new.carstate');

      await this.client.connect();
    }

    @Post('/')
    addCarState(@Body() state: ICarState) {
      console.log(`generated new car state car_id: ${ state.id_car }`)
      return this.client.send('add.new.carstate', state);
    }

    @MessagePattern('add.new.trip')
    addTrip(@Payload() message: IKafkaMessage<ITrip>) {
      this.startSimulator(message.value)
      return message.value;
    }

    /*
      Simulator
    */
    startSimulator(trip: ITrip) {
      // Just for simulating the duration of trip setup maxCount of iterations
      let maxCount = this.getRandomArbitrary(3, 10);
      let iter = 0;

      this.interval = setInterval(function () {
        this.simulate(trip)

        iter++;
        if(iter >= maxCount) {
          clearInterval(this.interval);
        }
      }.bind(this), 5000);
    }

    simulate(trip: ITrip) {
      var state: ICarState = {
        "id_trip": trip.id_trip,
        "id_car": trip.id_car,
        "id_driver": trip.id_driver,
        "longitude": this.generateRandomLong(),
        "latitude": this.generateRandomLat(),
        "speed": this.getRandomArbitrary(30, 200)
      }

      console.log(`SimulatorController simulate new state.....id_car: ${ state.id_car } long: ${ state.longitude } lat: ${ state.latitude } speed: ${ state.speed } `)
      this.client.emit('add.new.carstate', state)
    }

    /*
      Math
    */
    getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    generateRandomLong() {
      var num = (Math.random()*180);
      var posorneg = Math.floor(Math.random());
      if (posorneg == 0) {
        num = num * -1;
      }
      return num;
    }

    generateRandomLat() {
      var num = (Math.random()*90);
      var posorneg = Math.floor(Math.random());
      if (posorneg == 0) {
        num = num * -1;
      }
      return num;
    }
}
