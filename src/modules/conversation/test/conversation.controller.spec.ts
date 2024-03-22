import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SequelizeModule } from '@nestjs/sequelize';
import Postgres from '../../../db/postgre';
import postgreTestConfig from '@config/database_test.config.json';
import { ConversationModule } from '../conversation.module';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { CloseConversationDto, CreateConversationDto } from '../dto';

let validToken: string;
const invalidToken = 'invalid-token';
let invalidUserToken: string;

const createConversationData: CreateConversationDto = {
    participants: ['USR-B4R6TF18YC6A']
};

const closeConversationData: CloseConversationDto = {
    conversationNumber: 'CON-35RK6A4FP91G'
};

describe('Conversation Controller Testing', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                ConversationModule,
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

        const invalidUserTokenData = await moduleFixture.get<AuthService>(AuthService).createTokenAndSession({
            userName: 'test1',
            userNumber: 'USR-B4R6TF18YC6A'
        });
        invalidUserToken = 'Bearer ' + invalidUserTokenData.token;
    });

    describe('Create Conversation', () => {
        it('should return 201 create conversation', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/conversation')
                .set('Authorization', validToken)
                .send(createConversationData)
                .expect(HttpStatus.CREATED);

            expect(body).toHaveProperty('conversationNumber');
            expect(typeof body.conversationNumber).toBe('string');
        });

        it('should return 403 create conversation by invalid token', async () => {
            await request(app.getHttpServer())
                .post('/conversation')
                .set('Authorization', invalidToken)
                .send(createConversationData)
                .expect(HttpStatus.FORBIDDEN);
        });
    });

    describe('Close Conversation', () => {
        it('should return 200 close conversation', async () => {
            await request(app.getHttpServer())
                .put('/conversation/close')
                .set('Authorization', validToken)
                .query(closeConversationData)
                .expect(HttpStatus.OK);
        });

        it('should return 404 close conversation by invalid user token', async () => {
            await request(app.getHttpServer())
                .post('/conversation/close')
                .set('Authorization', invalidUserToken)
                .query(closeConversationData)
                .expect(HttpStatus.FORBIDDEN);
        });

        it('should return 404 close conversation by invalid token', async () => {
            await request(app.getHttpServer())
                .post('/conversation/close')
                .set('Authorization', invalidToken)
                .query(closeConversationData)
                .expect(HttpStatus.NOT_FOUND);
        });
    });
});
