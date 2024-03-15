import { Module } from '@nestjs/common';
import { MessageSocketGateway } from './messageSocketGateway';

@Module({
    providers: [MessageSocketGateway],
    exports: [MessageSocketGateway]
})
export class GatewayModule {}
