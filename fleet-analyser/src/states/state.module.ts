import { Module } from '@nestjs/common';

import { CarStateController } from './state.controller';

@Module({
  controllers: [CarStateController],
  providers: [],
})
export class CarStateModule {}
