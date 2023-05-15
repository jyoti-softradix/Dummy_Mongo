require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import Routes from '../src/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec  from '../config/swagger';
import DB from '../src/helper/db';
import cors from 'cors';
import helmet from 'helmet';
import authMiddleWare from '../src/helper/middleware';
const morgan = require("morgan");

export default class Server {
    constructor(){
        this.app = null;
        this.db = null;
    }
    
    async initServer (){
        try{
            
            this.app = await express();
            this.app.use(bodyParser.json());
            this.app.use(
                bodyParser.urlencoded({
                    extended:true
                }),
            );
            this.app.use(morgan("tiny"));
            this.app.use(
                cors({
                    exposedHeaders:[
                        'date',
                        'content-type',
                        'content-length',
                        'connection',
                        'server',
                        'x-powered-by',
                        'access-content-allow-origin',
                        'authorization',
                        'x-final-url',
                    ],
                    allowedHeaders:['content-type', 'accept', 'authorization'],
                })
            )

            this.app.use(helmet());
            this.app.use(authMiddleWare);
            this.db = new DB();
            await this.db.init();
            await this.healthCheckRoute();
            await this.healthyDB()
            await this.configureRoutes(this.db);
            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
            return this.app
        }catch (err){
            throw err;
        }
    }
    
 

    async healthCheckRoute(){
        try{
            this.app.get("/",(req,res)=>{
                res.json({ 
                    status:"Healthy",
                    msg:"This works perfectly fine",
                });
            });
        }catch (err){
            throw err;
        }
    }
    async healthyDB(){
        try{
            if(await this.db.checkConnection()){
                this.app.get('/health',(req,res)=>{
                    res.json({
                        msg:"DB Connection Successfull",
                    });
                });
                return;
            }
            throw new Error('Error connecting to DB')
        }catch(err){
            throw err;
        }
    }
 
    async configureRoutes(db){
        this.router = express.Router();
        const routes =  new Routes(this.router, db);
        await routes.routesRegistration();
        this.app.use(cors(), this.router);
     }
}
