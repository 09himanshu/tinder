import Fastify from 'fastify'
import dotenv from 'dotenv'

import {Dbservices} from './services/db.js'

dotenv.config()

async function init() {
    const fastify = Fastify({logger: true})

    let db_service = new Dbservices(process.env.url, process.env.db_name)

    global.db_service = db_service
}