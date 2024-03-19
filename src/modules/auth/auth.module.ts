import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import baseConfig from '../../baseConfig';
import type { RedisClientOptions } from 'redis';
import redisConfig from '@config/redis.config.json';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            host: redisConfig.host,
            port: redisConfig.port
        }),
        JwtModule.register({
            global: true,
            secret: baseConfig.JWT_KEY,
            signOptions: { expiresIn: baseConfig.JWT_EXPIRE_TIME }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
