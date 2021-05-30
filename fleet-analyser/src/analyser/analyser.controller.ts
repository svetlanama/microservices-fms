import {Body, Controller, Get, Post} from '@nestjs/common';
import {CarStateService} from "../states/state.service";
import {PenaltyService} from "../penalty/penalty.service";

import {MessagePattern, Payload} from "@nestjs/microservices";
import {IKafkaMessage} from "../interfaces/kafka-message.interface";

import {ICarState} from "../states/interfaces/carstate.interface";


@Controller()
export class AnalyserController {

  constructor(private readonly carStateService: CarStateService, private readonly penaltyService: PenaltyService) {}

  @MessagePattern('get.penaltystats.list')
  getStats() {
     return this.penaltyService.getPenaltyStats();
  }

  @MessagePattern('add.new.carstate')
  addCarState(@Payload() message: IKafkaMessage<ICarState>) {
    this.penaltyService.addPenalty(message.value)
    return this.carStateService.addState(message.value);
  }
}
