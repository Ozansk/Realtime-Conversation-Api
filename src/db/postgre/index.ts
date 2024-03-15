import { Sequelize } from 'sequelize-typescript';
import { QueryOptions } from 'sequelize/lib/dialects/abstract/query-interface';
import { SyncOptions } from 'sequelize/lib/sequelize';
import { User, Message, Conversation } from './entities';

export class Postgres {
    private static DB: Sequelize;
    private config;
    public static entities;
    private domain;
    private sequelizeModel;

    static getTransaction = () => Postgres.DB.transaction();
    static rawQuery = (query: string, options?: QueryOptions) => Postgres.DB.query(query, options);

    setDomain(domain) {
        this.domain = domain;
        return this;
    }

    setConfig(config) {
        this.config = config;
        return this;
    }

    setSequelizeModel() {
        this.sequelizeModel = {
            host: this.config.HOSTNAME,
            username: this.config.USERNAME,
            password: this.config.PASSWORD,
            database: this.config.SCHEMA,
            dialect: 'postgres',
            pool: {
                max: this.config.OPTIONS.MAX_CONNECTION,
                min: this.config.OPTIONS.MIN_CONNECTION,
                idle: this.config.OPTIONS.IDLE_TIME
            },
            logging: this.config.OPTIONS.LOGGING || false,
            benchmark: this.config.OPTIONS.BENCHMARK || false,
            models: this.getModels(),
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.entity')).toLowerCase() === member.toLowerCase();
            },
            repositoryMode: true,
            dialectOptions: {
                decimalNumbers: true
            },
            timezone: 'Europe/Istanbul'
        };
        return this;
    }

    getSequelizeModel() {
        return this.sequelizeModel;
    }

    private createDB = () => new Sequelize(this.sequelizeModel);

    async initializeDB(sync?: boolean, syncOptions?: SyncOptions) {
        Postgres.DB = this.createDB();
        Postgres.DB.authenticate()
            .then(() => {
                this.setEntities();
                console.log('DB is authenticated!');
            })
            .catch((err) => {
                console.log('DB is cannot authenticated!', err);
            });

        if (sync) {
            await Postgres.DB.sync(syncOptions);
        }
    }

    private setEntities() {
        switch (this.domain) {
            case 'nestjsProject':
            case 'test':
                this.getRepositories();
                break;
        }
    }

    private getRepositories() {
        Postgres.entities = {
            users: Postgres.DB.getRepository(User),
            messages: Postgres.DB.getRepository(Message),
            conversation: Postgres.DB.getRepository(Conversation)
        };
    }

    private getModels() {
        return [User, Message, Conversation];
    }
}

export default Postgres;
