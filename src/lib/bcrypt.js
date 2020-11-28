const bcrypt = require('bcryptjs'); 
const helpers = {};

helpers.encrypt = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

helpers.compare = async(password, passwordDB) => {
    return await bcrypt.compare(password, passwordDB);
}
//bcrypt.compare async

module.exports = helpers;