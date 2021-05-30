import { Module } from '@nestjs/common';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [SimulatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
