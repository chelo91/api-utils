export default class BaseMongo {
    constructor(baseModel) {
        this.model = baseModel;
    }
    async create(data) {
        return this.model.create(data);
    }
    async read(query) {
        return this.model.find(query);
    }
    async readOne(query) {
        return this.model.findOne(query);
    }
    async update(query, data) {
        return this.model.updateOne(query, data);
    }
    async delete(query) {
        return this.model.deleteOne(query);
    }
}