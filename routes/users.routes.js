import * as Controller from '../controller/users.controller.js'
import * as Middleware from '../middleware/verify_jwt.middleware.js'

export default async function(fastify) {
    fastify.addHook('preHandler', Middleware.verify_jwt)

    fastify.post('/api/v1/initialProfileComp', Controller.insert)
    fastify.get('/api/v1/userProfile/:_id', Controller.findOne)
    fastify.get('/api/v1/get_all_user_profile', Controller.find)
    fastify.put('/api/v1/update_profile', Controller.update)
    fastify.put('/api/v1/delete_profile', Controller.delete_account)
}