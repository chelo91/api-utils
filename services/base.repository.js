
export default class BaseRepository {
    constructor(dao) {
        this.dao = dao
    }
    create = async (data) => { return await this.dao.create(data) }
    read = async (query) => { return await this.dao.read(query) }
    readOne = async (query) => { return await this.dao.readOne(query) }
    update = async (query, data) => { return await this.dao.update(query, data) }
    delete = async (query) => { return await this.dao.delete(query) }
}