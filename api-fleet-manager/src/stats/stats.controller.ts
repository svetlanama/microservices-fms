import {Body, Controller, Get, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";


@Controller('stats')
export class StatsController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'fleet',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'c-consumer'
            }
        }
    })
    client: ClientKafka;

    async onModuleInit() {
        this.client.subscribeToResponseOf('get.penaltystats.list');

        await this.client.connect();
    }

    @Get('/')
    getStats() {
        return this.client.send('get.penaltystats.list', '');
    }
}
