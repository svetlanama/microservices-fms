import { Injectable } from '@nestjs/common';
import {ICarState} from "./interfaces/carstate.interface";

@Injectable()
export class CarStateService {

  states: Array<ICarState>;

  constructor() {
    this.states = [];
  }

  getStates(): Array<ICarState> {
    return this.states;
  }

  addState(state: ICarState): ICarState {
    this.states.push(state);
    return this.states[this.states.length - 1];
  }
}
