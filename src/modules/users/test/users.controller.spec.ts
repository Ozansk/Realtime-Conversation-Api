import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SequelizeModule } from '@nestjs/sequelize';
import Postgres from '../../../db/postgre';
import postgreTestConfig from '@config/database_test.config.json';
import { UsersModule } from '../users.module';
import { AuthModule } from '../../auth/auth.module';
import { CreateUserDto } from '../dto';

const createUserData: CreateUserDto = {
    firstName: 'test3',
    lastName: 'test3',
    userName: 'test3',
    password: '12345678',
    phoneNumber: '5111111113'
};

describe('Users Controller Testing', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                UsersModule,
                SequelizeModule.forRoot(
                    new Postgres().setConfig(postgreTestConfig).setSequelizeModel().getSequelizeModel()
                )
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Create User', () => {
        it('should return 201 create user', async () => {
            await request(app.getHttpServer()).post('/users').send(createUserData).expect(HttpStatus.CREATED);
        });
    });
});
