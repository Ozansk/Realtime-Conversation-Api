import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import baseConfig from 'baseConfig';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(baseConfig.SERVER_PORT);
}
bootstrap();
