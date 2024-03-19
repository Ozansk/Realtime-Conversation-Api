import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { LoginDto } from '../dto';
import request from 'supertest';
import { SequelizeModule } from '@nestjs/sequelize';
import Postgres from '../../../db/postgre';
import postgreTestConfig from '@config/database_test.config.json';
import { AuthModule } from '../auth.module';

const loginData: LoginDto = {
    userName: 'test',
    password: '12345678'
};

describe('Auth Controller Testing', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                SequelizeModule.forRoot(
                    new Postgres().setConfig(postgreTestConfig).setSequelizeModel().getSequelizeModel()
                )
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Login', () => {
        it('should return 201 login', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/auth/login')
                .send(loginData)
                .expect(HttpStatus.CREATED);

            expect(body).toHaveProperty('token');
            expect(typeof body.token).toBe('string');
            expect(body).toHaveProperty('expireDate');
            expect(typeof body.expireDate).toBe('string');
        });
    });
});
