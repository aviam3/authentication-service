const jwt = require('jsonwebtoken');
const { MAX_TOKEN_AGE, JWT_SECRET } = require('../constants');

function generateJWT(user){
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: MAX_TOKEN_AGE, // 3hrs in sec
      }
    );
    return token;
}

function setJwtCookie(res, token){
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: MAX_TOKEN_AGE * 1000, // 3hrs in ms
    });
}

module.exports = {
    generateJWT,
    setJwtCookie,
  }
  