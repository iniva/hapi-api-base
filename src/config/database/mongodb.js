export default {
  uri: process.env.MONGO_DB_URI,
  config: {
    useNewUrlParser: true,
    autoIndex: true,
    connectTimeoutMS: 10000, // 10 seconds before time-out
  },
};
