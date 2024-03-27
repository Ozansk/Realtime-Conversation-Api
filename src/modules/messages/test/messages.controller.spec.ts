import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SequelizeModule } from '@nestjs/sequelize';
import Postgres from '../../../db/postgre';
import postgreTestConfig from '@config/database_test.config.json';
import { MessagesModule } from '../messages.module';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { CreateMessageDto, GetMessagesByConversationNumberDto } from '../dto';

let validToken: string;

const createMessageData: CreateMessageDto = {
    conversationNumber: 'CON-35RK6A4FP91G',
    text: 'Hello Team!'
};

const getMessagesByConversationNumberData: GetMessagesByConversationNumberDto = {
    conversationNumber: 'CON-35RK6A4FP91G'
};

describe('Messages Controller Testing', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                MessagesModule,
                SequelizeModule.forRoot(
                    new Postgres().setConfig(postgreTestConfig).setSequelizeModel().getSequelizeModel()
                )
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const mainUserTokenData = await moduleFixture.get<AuthService>(AuthService).createTokenAndSession({
            userName: 'test',
            userNumber: 'USR-AT41YB6R4Z3D'
        });
        validToken = 'Bearer ' + mainUserTokenData.token;
    });

    describe('Create Message', () => {
        it('should return 201 create message', async () => {
            await request(app.getHttpServer())
                .post('/messages')
                .set('Authorization', validToken)
                .send(createMessageData)
                .expect(HttpStatus.CREATED);
        });
    });

    // todo ozan add 'return 401 or 404' tests here after create Message Guard

    describe('Get Messages By Conversation Number', () => {
        it('should return 200 get Messages by conversation number', async () => {
            await request(app.getHttpServer())
                .get('/messages')
                .set('Authorization', validToken)
                .query(getMessagesByConversationNumberData)
                .expect(HttpStatus.OK);
        });
    });
});
