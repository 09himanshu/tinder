import {MongoClient, ObjectId} from 'mongodb'

class Dbservices {
    #url;
    #db_name;
    #client;
    #collection_names = []
    #db

    constructor (url, db_name) {
        if(!Dbservices.instance) {
            this.#url = url
            this.#db_name = db_name
        }
    }

    async _ensure_connection() {
        try {
            if(!this.#client) {
                this.#client = new MongoClient(this.#url, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                })
                // this.#client.
            }
        } catch (err) {
            console.log(err);
        }
    }

    async connect() {
        await this.#client.connect
    }
}