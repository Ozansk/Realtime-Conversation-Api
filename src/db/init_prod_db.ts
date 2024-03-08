import Postgres from './postgre';

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
            .setSequelizeModel()
            .initializeDB(true, { logging: true });
        console.log('DB Sync COMPLETED');
        process.exit(0);
    } catch (e) {
        console.log('DB Sync FAILED: ', e);
        process.exit(0);
    }
})();
