import {getCoordinatesForPlace} from '../utils/helper.js'

const insert = async(req, res) => {
    try {
        let body = req.body

        let data = await getCoordinatesForPlace(body.homeCity)
        body.fullName = ''
        body.email = ''
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
        body.subscription = {}

        data = await global.db_service.insertOne('users', body)
        return res.status(201).send({status: true, message: 'Success', payload: data})

    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Failure', payload: {}})
    }
}

const find = async(req, res) => {
    try {
        let matchLookingFor = req.query.match
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Failure', payload: {}})
    }
}

export {insert}