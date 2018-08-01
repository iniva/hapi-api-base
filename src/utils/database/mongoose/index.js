import mongoose from 'mongoose';
import { EventEmitter } from 'events';

import Logger from 'Utils/logger';

const log = Logger.create('plugins:database:mongoose');

export default class Mongoose extends EventEmitter {
    constructor({ uri, config }) {
        super();

        mongoose.Promise = Promise;
        this.mongoose = mongoose;
        this.models = {};

        this.connection = mongoose.createConnection(uri, config, error => {
            if (error) {
                this.emit('error', error);
            }

            this.connection
                .on('connected', () => {
                    log('Connection to database ready');
                    this.emit('ready', `✔ Connected to ${uri}`);
                })
                .on('error', error => {
                    log(`Unable to connect to database: ${error.message}`);
                    this.emit('error', error);
                })
                .on('open', () => {
                    this.emit('open', 'Connection to database opened');
                })
                .on('close', () => {
                    log('Connection to database closed');
                    this.emit('close', 'Connection to database closed');
                })
                .on('disconnected', () => {
                    log('Connection to database disconnected');
                    this.emit('disconnected', 'Database disconnected');
                });
        });
    }

    setModels(schemas = {}) {
        for (const key in schemas) {
            this.models[key] = this.connection.model(key, schemas[key]);
        }
    }

    getModel(name) {
        if (!this.models.hasOwnProperty(name)) {
            throw new Error(`Model '${name}' does not exist`);
        }
        return this.models[name];
    }
}
