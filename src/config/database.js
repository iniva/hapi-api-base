export const MONGODB = {
    uri: process.env.MONGO_DB_URI,
    config: {
        autoIndex: true,
        connectTimeoutMS: 10000 // 10 seconds before time-out
    }
};
