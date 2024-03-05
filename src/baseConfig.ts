const baseConfig = {
    SERVER_PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_KEY: process.env.JWT_KEY || 'secret',
    JWT_EXPIRE_TIME: 3600 * 12,
    CLOSE_CONSUMERS: process.env.CLOSE_CONSUMERS || true
};

export default baseConfig;
