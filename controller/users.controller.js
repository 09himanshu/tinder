import {ObjectId} from 'mongodb'
import {getCoordinatesForPlace} from '../utils/helper.js'

const insert = async(req, res) => {
    try {
        let body = req.body
        let _id = req._id

        let data = await getCoordinatesForPlace(body.homeCity)
        body.fullName = ''
        body.lat = data.latitude
        body.lng = data.longtitude
        body.isProfileCompleted = false
        body.travellingTo = "",
        body.about = "",
        body.description = "",
        body.matchLookingFor = "",
        body.height = "",
        body.hobbies = "",
        body.doesSmoke = '',
        body.doesDrink = '',
        body.instagramLink = "",
        body.facebookLink = "",
        body.status = 1
        body.subscription = {}
        body.updatedAt = new Date()

        // reusing the variable
        data = await global.db_service.updateOne('users', {_id: new ObjectId(_id)},{$set: body})
        res.status(201).send({status: true, message: 'Success', payload: data.data})

    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Failure', payload: {err}})
    }
}

const find = async(req, res) => {
    try {
        let matchLookingFor = req.query.match
        let _id = req._id
        let data;
        if(!_id) return res.status(401).send({status: false, message: 'Failure', payload: {}})
        if(matchLookingFor) {
            data = await global.db_service.findMany('users',{_id: {$ne: new ObjectId(_id)}, matchLookingFor, status: 1 })
        } else {
            data = await global.db_service.findMany('users',{_id: {$ne: new ObjectId(_id)}, status: 1})
        }
        res.status(500).send({ status: true, message: 'Success', payload: data.data })
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Failure', payload: {err}})
    }
}

const findOne = async (req, res) => {
    try {
        let _id = req.params._id
        if(!_id) return res.status(401).send({status: false, message: 'Failure', payload: {}})
        let data = await global.db_service.findOne('users', {'_id': new ObjectId(_id), status: 1})
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}

const update = async(req, res) => {
    try {
        let _id = req._id
        let body = req.body
        body.updatedAt = new Date()
        if(!_id) return res.status(401).send({status: false, message: 'Failure', payload: {}})

        let update = {
            $set: {...body}
        }
        let data = await global.db_service.updateOne('users', {_id: new ObjectId(_id)},update)
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}

const delete_account = async(req, res) => {
    try {
        let _id = req._id
        if(!_id) 
            return res.status(401).send({status: false, message: 'Failure', payload: {}})
        
        let data = await global.db_service.updateOne('users', {_id: new ObjectId(_id)}, {$set: {status: -1, updatedAt: new Date()}})
        res.status(201).send({status: true, message: 'Success', payload: data.data})
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {err} })
    }
}


export { insert, findOne, find, update, delete_account }