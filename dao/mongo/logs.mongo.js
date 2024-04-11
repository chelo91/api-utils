import logModel from '../model/logs.model.js';
import BaseMongo from './base.mongo.js';

export default class LogsMongo extends BaseMongo{
    constructor() {
        super(logModel);
    }
}