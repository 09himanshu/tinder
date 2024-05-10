import jwt from 'jsonwebtoken'

const verify_jwt = async(req, res) => {
    try {
      let token = req.headers['x-access-token']

      if (!token) {
        return res.status(403).send({ message: `No token provided` })
      }

      // check the validity of token
      jwt.verify(token, global.env.secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).send({ message: `Unauthorized` })
        }
        // Reading the user from the token and setting it in the req object
        req._id = decodedToken.id
      })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, message: 'Failure', payload: {} })
    }
}


export { verify_jwt }