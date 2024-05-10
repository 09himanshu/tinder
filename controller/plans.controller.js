import {ObjectId} from 'mongodb'

const create_plans = async (req, res) => {
    try {
        let body = req.body
        body.createdAt = new Date()
        body.updatedAt = new Date()
        let data = await global.db_service.insertOne('plans', body)
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}

const get_plans = async(req, res) => {
    try {
        let data = await global.db_service.findMany('plans', {})
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}

const subscription = async(req, res) => {
    try {
        let plan_id = req.params.plan_id
        let _id = req._id

        let plan = await global.db_service.findOne('plans', {_id: new ObjectId(plan_id)})
        plan = plan.data
        let obj = {
          user_id: _id,
          plan_id: plan_id,
          status: 1,
          subscriptionStartedAt: new Date(),
          expiredAt: new Date(new Date().setDate(new Date().getDate() + plan.duration)),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await global.db_service.insertOne('subscriptions', obj)

        let data = await global.db_service.updateOne(
          'users',
          { _id: new ObjectId(_id) },
          {
            $set: {
              subscription: {
                subscriptionType: plan.subscriptionType,
                isChattingAllowed: plan.isChattingAllowed,
                isCommentingAllowed: plan.isCommentingAllowed,
                isPostingAllowed: plan.isPostingAllowed,
                isNearbyAllowed: plan.isNearbyAllowed,
                isTravelModeAllowed: plan.isTravelModeAllowed,
                subscriptionStartedAt: obj.subscriptionStartedAt,
                createdAt: obj.expiredAt
              },
            },
          }
        )
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}

export { create_plans, get_plans, subscription }