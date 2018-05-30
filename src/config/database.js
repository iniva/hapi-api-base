'use strict';

import path from 'path';

export const LOCAL = {
    database: 'local',
    username: null,
    password: null,
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database/local.sqlite'),
    define: {
        underscored: true,
        timestamps: true,
        charset: 'utf8'
    },
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000
    }
};

export const MONGODB = {
    uri: process.env.MONGO_DB_URI,
    config: {
        autoIndex: true,
        connectTimeoutMS: 10000 // 10 seconds before time-out
    }
};
