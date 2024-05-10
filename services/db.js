import {MongoClient, ObjectId} from 'mongodb'

class Dbservices {
    
    #collection_names = []
    constructor (url, db_name) {
        if(!Dbservices.instance) {
           this.client = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
           this.connect()
           this.db = this.client.db(db_name)
           this.get_collections()
           .then(ele => this.#collection_names = ele.map(e => e.name))
           .catch(err => console.log(err))
           console.log();
           Dbservices.instance = this
        }
    }
    
    async get_collections() {
        try {
            let collection = await this.db.listCollections().toArray()
            // this.#collection_names = collection.map(ele => ele.name)
            return collection
        } catch (err) {
            console.log(err);
        }
    }

    async connect() {
        return await this.client.connect()
    }

    async findMany(collection, filter, projection) {
        try {
            if(!this.#collection_names.includes(collection)) {
                return {status: false, data: 'No collection found'}
            }

            let limit = 100
            let skip = 0
            let sort = {}

            if(filter.limit) {
                limit = filter.limit
                delete filter.limit
            }

            if(filter.skip) {
                skip = filter.skip
                delete filter.skip
            }

            if(filter.sort) {
                sort = filter.sort
                delete filter.sort
            }

            let data = await this.db.collection(collection).find(filter || {}, projection || {}).skip(skip).limit(limit).sort(sort).toArray()
            return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }

    async findOne(collection, filter, projection) {
        try {
            if (!this.#collection_names.includes(collection)) {
                return { status: false, data: 'No collection found' }
            }
            
            let data = await this.db.collection(collection).findOne(filter|| {}, projection || {})
            if(!data) return {status: false, data: null}
            else return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }

    async insertOne(collection, document) {
        try {
            if (!this.#collection_names.includes(collection)) {
              await this.db.createCollection(collection)
              this.#collection_names.push(collection)
            }

            let data = await this.db.collection(collection).insertOne(document)
            return {status: true, data};
        } catch (err) {
            console.log(err);
        }
    }

    async insertMany(collection, document) {
        try {
            if (!this.#collection_names.includes(collection)) {
              await this.db.createCollection(collection)
              this.#collection_names.push(collection)
            }

            let data = await this.db.collection(collection).insertMany(document)
            return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(collection, filter, update) {
        try {
            if (!this.#collection_names.includes(collection)) {
              return { status: false, data: 'No collection found' }
            }

            let data = await this.db.collection(collection).updateOne(filter, update)
            return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }

    async updateMany(collection, filter, update) {
        try {
            if (!this.#collection_names.includes(collection)) {
              return { status: false, data: 'No collection found' }
            }

            let data = await this.db.collection(collection).updateMany(filter, update)
            return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }

    async deleteOne(collection, filter) {
        try {
            if (!this.#collection_names.includes(collection)) {
              return { status: false, data: 'No collection found' }
            }

            let data = await this.db.collection(collection).deleteOne(filter)
            return { status: true, data }
        } catch (err) {
            console.log(err);
        }
    } 

    async deleteMany(collection, filter) {
        try {
            if (!this.#collection_names.includes(collection)) {
                return { status: false, data: 'No collection found' }
            }
            let data = await this.db.collection(collection).deleteMany(filter)
            return {status: true, data}
        } catch (err) {
            console.log(err);
        }
    }
}

export {Dbservices}