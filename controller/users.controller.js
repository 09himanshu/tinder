import {getCoordinatesForPlace} from '../utils/helper.js'

const insert = async(req, res) => {
    try {
        let body = req.body

    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'Failure', payload: {}})
    }
}