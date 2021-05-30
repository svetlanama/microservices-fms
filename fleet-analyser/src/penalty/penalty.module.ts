import { Module } from '@nestjs/common';
import { PenaltyController } from './penalty.controller';

@Module({
  controllers: [PenaltyController],
  providers: [],
})
export class PenaltyModule {}
