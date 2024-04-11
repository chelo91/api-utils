import imageModel from '../model/images.model.js';
import BaseMongo from './base.mongo.js';

export default class ImagesMongo extends BaseMongo {
    constructor() {
        super(imageModel);
    }
}