// import config from "config";
// const mongoose = require("mongoose");
// export default class DB {
//     constructor() {
//         this.dbConfig = config.db;
//         this.db = {};
//         this.isDbRunning = true;
//     }

//     async init() {
//         await this.connectDatabase();
//         await this.setupModels();
//     }
//     async connectDatabase() {
//     try{
//     mongoose.connect(process.env.MONGODB_URL + "/" + process.env.DATABASE, {
//         useNewUrlParser: true
//     })
//     .then(() => {
//         console.log("Connection to Client DB has been established successfully.")
//     })
//     .catch((err) => {
//         console.error('Unable to connect to the Client database:', err)
//     })
//         } catch (err) {
//           throw err;
//         }
//     }

//     async checkConnection() {
//         try {
//             return this.isDbRunning;
//         } catch (error) {
//             return !this.isDbRunning;
//         }
//     }


//     async setupModels() {
//         this.db.models = {};
//         this.db.models.Users = require("../../database/models/user");
//         this.db.models.Roles = require("../../database/models/roles");



//     this.db.models.Users.aggregate([
//         {
//           $lookup: {
//             from: "Roles",
//             localField: "role_id",
//             foreignField: "_id",
//             as: "role"
//           }
//         }
//       ]);
//     }

//     async getDB() {
//         return this.db;
//     }
// }
import mongoose from 'mongoose';
import dbConfig from '../../config/db';

export default class DB {
  constructor() {
    this.dbConfig = dbConfig.development.mongodb.client;
    this.db = {};
    this.isDbRunning = true;
  }

  async init() {
    await this.connectDatabase();
    await this.setupModels();
  }

  async connectDatabase() {
    try {
      await mongoose.connect(
        this.dbConfig.url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: this.dbConfig.database,
        }
      );
      console.log(`Connection to ${this.dbConfig.database} database has been established successfully.`);
    } catch (err) {
      console.error(`Unable to connect to the ${this.dbConfig.database} database:`, err);
      throw err;
    }
  }

  async checkConnection() {
    try {
      return this.isDbRunning;
    } catch (error) {
      return !this.isDbRunning;
    }
  }

  async setupModels() {
    this.db.models = {};
    this.db.models.Users = require('../../database/models/user');
    this.db.models.Roles = require('../../database/models/roles');

    this.db.models.Users.aggregate([
      {
        $lookup: {
          from: "Roles",
          localField: "role_id",
          foreignField: "_id",
          as: "roles"
        }
      }
    ])
  }

  async getDB() {
    return this.db;
  }
}


