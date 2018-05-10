'use strict';

import Sequelize from 'sequelize';

import Logger from 'Utils/logger';

const log = Logger.create('utils:database:orm');

const ASSOCIATION_TYPES = {
    hasMany: 'hasMany',
    belongsTo: 'belongsTo',
    hasOne: 'hasOne',
    belongsToMany: 'belongsToMany'
};

export default class Orm {
    constructor(options) {
        options = Object.assign({ operatorsAliases: false, logging: false }, options);
        this.conn = new Sequelize(options.database, options.username, options.password, options);
        this.models = {};
    }

    static get associationTypes() {
        return ASSOCIATION_TYPES;
    }

    setModels(models) {
        for (const modelName in models) {
            const { name, definition, options = {}} = models[modelName];

            this.models[name] = this.conn.define(name, definition, options);
        }
    }

    getModel(model) {
        if (!this.models.hasOwnProperty(model)) {
            throw new Error(`'${model}' model doesn't exist`);
        }

        return this.models[model];
    }

    setAssociations(models) {
        for (const modelName in models) {
            const model = models[modelName];

            if (model.hasOwnProperty('associations')) {
                model.associations.forEach(({ type, target, options }) => {
                    this.models[model.name].associate = (models, type, target, options = {}) => {
                        return this.models[model.name][type](models[target], options);
                    };
                    this.models[model.name].associate(this.models, type, target, options);
                });
            }
        }
    }

    async init(dbName) {
        return await this.conn.sync()
            .then(() => {
                log(`ORM: ${dbName} database initialized`);
            })
            .catch(error => {
                log(`ORM: An error occurred while trying to initialize the ${dbName} database`);
                log(error);
                throw new Error(error);
            });
    }

    async testConnection() {
        return await this.conn.authenticate();
    }

    async close() {
        return await this.conn.close();
    }

    async destroy(model, options = {}) {
        return this.getModel(model).destroy(options);
    }

    async query(query, options) {
        return this.conn.query(query, options);
    }

    async bulkCreate(model, options) {
        return await this.getModel(model).bulkCreate(options.data);
    }

    async findOne(model, options) {
        return await this.getModel(model).findOne(options);
    }

    async findById(model, id) {
        return await this.getModel(model).findById(id);
    }

    async findAll(model, options = {}) {
        return await this.getModel(model).findAll(options);
    }
}
