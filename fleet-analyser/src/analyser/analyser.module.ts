import { Module } from '@nestjs/common';

import { AnalyserController } from './analyser.controller';
import { CarStateService } from '../states/state.service';
import { PenaltyService } from '../penalty/penalty.service';

import { MongooseModule } from '@nestjs/mongoose';
import { PenaltySchema } from '../penalty/penalty.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Penalty', schema: PenaltySchema }]),
  ],
  controllers: [AnalyserController],
  providers: [CarStateService, PenaltyService],
})
export class AnalyserModule {}
