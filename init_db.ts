import { Sequelize } from 'sequelize-typescript';
import { QueryOptions } from 'sequelize/lib/dialects/abstract/query-interface';
import { SyncOptions } from 'sequelize/lib/sequelize';
import { User } from './src/users/user.entity';

export class Postgres {
    private static DB: Sequelize;
    private config;
    public static entities;
    private domain;

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

    private createDB = () =>
        new Sequelize({
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
            models: [User],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.entity')).toLowerCase() === member.toLowerCase();
            },
            repositoryMode: true,
            dialectOptions: {
                decimalNumbers: true
            },
            timezone: 'Europe/Istanbul'
        });

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
                Postgres.entities = {
                    User: Postgres.DB.getRepository(User)
                };
                break;
        }
    }
}

(async () => {
    console.log('DB Sync STARTING');
    try {
        await new Postgres()
            .setDomain('nestjsProject')
            .setConfig({
                HOSTNAME: '127.0.0.1',
                PORT: 5432,
                USERNAME: 'postgres',
                PASSWORD: 'postgres',
                SCHEMA: 'nestjsProject',
                OPTIONS: {
                    LOGGING: false,
                    BENCHMARK: false,
                    MAX_CONNECTION: 100,
                    MIN_CONNECTION: 3,
                    IDLE_TIME: 5000
                }
            })
            .initializeDB(true, { logging: true });
        console.log('DB Sync COMPLETED');
        process.exit(0);
    } catch (e) {
        console.log('DB Sync FAILED: ', e);
        process.exit(0);
    }
})();
