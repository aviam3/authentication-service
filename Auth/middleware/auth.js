const { JWT_SECRET } = require("../constants")

function authintication(req, res, next){
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
            next()
          //Check roles
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
}

module.exports = {
    authintication,
}
