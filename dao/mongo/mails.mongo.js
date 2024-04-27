import mailModel from '../model/mails.model.js';
import BaseMongo from './base.mongo.js';

export default class MailsMongo extends BaseMongo {
    constructor() {
        super(mailModel);
    }
}