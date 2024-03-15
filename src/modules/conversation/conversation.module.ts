import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './conversation.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './conversation.entity';
import { AuthModule } from '../auth/auth.module';
import type { RedisClientOptions } from 'redis';
import redisConfig from '@config/redis.config.json';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            host: redisConfig.host,
            port: redisConfig.port
        }),
        AuthModule,
        SequelizeModule.forFeature([Conversation])
    ],
    controllers: [ConversationController],
    providers: [ConversationService, ConversationRepository]
})
export class ConversationModule {}
