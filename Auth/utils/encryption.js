const bcrypt = require("bcrypt")
const saltRounds  = 10

async function encrypt(textToEncrypt) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(textToEncrypt, salt);
      return hash;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async function validateEncrypt(string, hash){
    try{
      const isValid = await bcrypt.compare(string, hash)
      return isValid
    }catch(err){
      console.error(err.message)
    }
  }
  
async  function validatePassword(password, hash) {
  return await validateEncrypt(password, hash);
}


module.exports = {encrypt, validatePassword}
