import { Module } from '@nestjs/common';

import { AnalyserModule } from './analyser/analyser.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AnalyserModule,
    MongooseModule.forRoot(
       process.env.DB_CONNECTION_STRING || '',
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
