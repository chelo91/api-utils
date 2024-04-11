import userModel from '../model/users.model.js';
import BaseMongo from './base.mongo.js';

export default class UsersMongo extends BaseMongo {
    constructor() {
        super(userModel);
    }
}