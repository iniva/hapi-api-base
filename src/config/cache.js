import { Time } from 'Utils/helpers/units';

const DEFAULT_TIMEOUT = 5;
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 6379;
const DEFAULT_MAX_ATTEMPTS = 3;

const host = process.env.REDIS_HOST || DEFAULT_HOST;
const port = process.env.REDIST_PORT || DEFAULT_PORT;
const connectTimeout = Time.toMilliseconds(process.env.REDIS_CONNECT_TIMEOUT || DEFAULT_TIMEOUT);
const maxAttempts = process.env.REDIS_MAX_ATTEMPTS || DEFAULT_MAX_ATTEMPTS;

export const REDIS = {
    config: {
        host,
        port,
        connectTimeout
    },
    settings: {
        maxAttempts
    }
};
