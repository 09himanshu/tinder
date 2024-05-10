import * as Controller from '../controller/plans.controller.js'

export default async function(fastify) {

    fastify.post('/api/v1/create_plan', Controller.create_plans)
    fastify.get('/api/v1/getPlan', Controller.get_plans)
    
}