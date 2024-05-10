import * as Controller from '../controller/auth.controller.js'

export default async function (fastify) {
    fastify.post('/api/v1/sign_up', Controller.sign_up)
    fastify.post('/api/v1/sign_in', Controller.sign_in)
}