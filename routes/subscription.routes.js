import * as Controller from '../controller/plans.controller.js'
import * as Middleware from '../middleware/verify_jwt.middleware.js'

export default async function (fastify) {
  fastify.addHook('preHandler', Middleware.verify_jwt)
  fastify.post('/api/v1/get_subscription/:plan_id', Controller.subscription)
}