require('dotenv').config();
module.exports = {
    development:{
        url: process.env.MONGODB_URL,
        database: process.env.DATABASE,
    }
}