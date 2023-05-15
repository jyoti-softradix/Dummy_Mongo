require('dotenv').config();

const db = {
  development:{
    mongodb: {
      client: {
        url: process.env.MONGODB_URL,
        database: process.env.DATABASE,
        options: {
            useNewUrlParser: true
          }
      },
    },
  },
};
module.exports = db