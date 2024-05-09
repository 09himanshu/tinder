import Fastify from 'fastify'
import dotenv from 'dotenv'

import {Dbservices} from './services/db.js'

dotenv.config()
async function start(fastify) {
    try {
        fastify.listen({port: process.env.port}, (err) => {
            if(err) throw new Error(err)
            console.log(`****** Server listen on port ${process.env.port} *******`)
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

async function init() {
    const fastify = Fastify({logger: true})

    let db_service = new Dbservices(process.env.url, process.env.db_name)
    
    let obj = {
        url:process.env.url,
        db_name:process.env.db_name,
        port:process.env.port,
        link:process.env.link,
        api_key:process.env.api_key
    }
    global.db_service = db_service
    global.env = obj
    
    start(fastify) 
}

init()