import { Injectable } from '@nestjs/common';
import { IPenaltyStats } from "./interfaces/penaltystats.interface";
import { ICarState } from "../states/interfaces/carstate.interface";

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Penalty } from './penalty.model';

@Injectable()
export class PenaltyService {

  constructor( @InjectModel('Penalty') private readonly penaltyModel: Model<Penalty>) {}

  getPenalty(state: ICarState): number {
    var penalty = 1;
    if (state.speed > 80) {
      penalty = 2;
    }
    if (state.speed > 100) {
      penalty = 5;
    }
    return penalty;
  }

  // MongoDB
  async getPenaltyStats(): Promise<IPenaltyStats[]> {

    const penalties = await this.penaltyModel.find().exec();

    let stats = penalties.map(p => ({
      id: p.id,
      id_driver: p.id_driver,
      penalty: p.penalty
    }));

    return stats
  }

  async addPenalty(state: ICarState): Promise<IPenaltyStats> {
    // TODO: refine and analyse each km only

    const newItem = new this.penaltyModel({
      id_driver: state.id_driver,
      penalty:this.getPenalty(state)
    });

    console.log(`Save penalty to MongoDB... id_driver: ${newItem.id_driver}  penalty: ${newItem.penalty}`)
    const result = await newItem.save();
    return result;
  }
}

/*
//Local Storage

export class PenaltyService {
  penalty: Array<IPenaltyStats>;

  constructor( @InjectModel('Penalty') private readonly penaltyModel: Model<Penalty>,) {
    this.penalty = [];
  }

  getPenalty(state: ICarState): number {
    var penalty = 1;
    if (state.speed > 80) {
      penalty = 2;
    }
    if (state.speed > 100) {
      penalty = 5;
    }
    return penalty;
  }

  getPenaltyStats(): Array<IPenaltyStats> {
    return this.penalty;
  }

  addPenalty(state: ICarState): IPenaltyStats {
    // TODO: refine and analyse each km only
    var penalty = {
      id_driver: state.id_driver,
      penalty: this.getPenalty(state)
    }
    this.penalty.push(penalty);
    return this.penalty[this.penalty.length - 1];
  }
}

*/

