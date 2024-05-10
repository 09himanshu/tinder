import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const sign_up = async (req, res) => {
  try {
    let { email, password } = req.body
    if (!email)
      return res
        .status(401)
        .send({ status: false, message: 'Failure', payload: { msg: 'Email is missing' } })

    if (!password)
      return res
        .status(401)
        .send({
          status: false,
          message: 'Failure',
          payload: { msg: 'Password is missing' },
        })

    password = bcrypt.hashSync(password, 8)
    let data = await global.db_service.insertOne('users', { email, password, createdAt: new Date(), updatedAt: new Date() })
    res.status(201).send({ status: true, message: 'Success', payload: data.data })
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: 'Failure', payload: { err } })
  }
}

const sign_in = async (req, res) => {
  try {
    let { email, password } = req.body
    if (!email)
      return res
        .status(401)
        .send({
          status: false,
          message: 'Failure',
          payload: { msg: 'Email is missing' },
        })

    if (!password)
      return res.status(401).send({
        status: false,
        message: 'Failure',
        payload: { msg: 'Password is missing' },
      })

    let data = await global.db_service.findOne('users', { email })

    if (!data.status) return res.status(404).send({ status: false, message: 'Failure', payload: {} })
    data = data.data
    let isValid = bcrypt.compareSync(password, data.password)
    if (!isValid) return res.status(401).send({ status: false, message: 'Failure', payload: { msg: 'Invalid password' } })

    let token = jwt.sign({ id: data._id }, global.env.secret, {
      expiresIn: 300,
    })

    res
      .status(201)
      .send({
        status: true, message: 'Success', payload: {
          token,
          id: data._id
        }
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: false, message: 'Failure', payload: { err } })
  }
}

export { sign_up, sign_in }