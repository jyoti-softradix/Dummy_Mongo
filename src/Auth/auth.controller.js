import Services from './auth.services';
import bcrypt from 'bcrypt';
import {refreshToken} from '../helper/jwt';
import {successResponse, errorResponse } from '../../config/responseHelper';
import { AuthMessages } from '../../constants/auth';
import { RESPONSE_CODES } from '../../config/constants';
import { CommonMessages } from '../../constants/common';
export default class Auth {
    async init(db) {
            this.services = new Services();
            this.Models = db.models;
            await this.services.init(db);
      }

    async signup (req,res){
        const {body, user} = req;
        console.log(body,user, "========user============")
        try{
            body.role_id = user._id;
            const checkEmailExist = await this.services.checkEmail(body.email)
            if(!checkEmailExist){
               await this.services.createUser(body)
                res.status(200).send({msg: "Signup successfully"})
            }else{
                res.status(400).send({msg: "Email already exists"})
            }
        }catch(error){
            console.log(error)
            res.status(500).send({msg: error.message})
        }
    }

    async login (req,res){
        const {email, password} = req.body;
        try{
            const checkEmailExist = await this.services.checkEmail(email)
            if(!checkEmailExist){
                return res.status(400).send( errorResponse(
                    AuthMessages.INVALID_EMAIL,
                    null,
                    RESPONSE_CODES.BAD_REQUEST
                  ))
            }
            const comparePassword = await bcrypt.compare(password, checkEmailExist.password)
            if(!comparePassword){
                return res.status(400).send( errorResponse(
                    AuthMessages.INVALID_PASSWORD,
                    null,
                    RESPONSE_CODES.BAD_REQUEST
                  ))
            }
            const payload = {
                _id: checkEmailExist._id,
                first_name: checkEmailExist.first_name,
                last_name:checkEmailExist.last_name,
                email: checkEmailExist.email,
                role_id: checkEmailExist.role_id,
            }
            const getUser = await this.services.getUserById(checkEmailExist._id)
            delete getUser.createdAt;
            delete getUser.updatedAt;
            delete checkEmailExist.password;
             /** generate token */
      const token = refreshToken(payload);
      const data = {
        access_token: token,
        user: getUser,
      };
      return res.status(201).send(successResponse(
        AuthMessages.LOGIN,
        data,
        RESPONSE_CODES.GET
      ))
        }catch(error){
            return res.status(500).send( errorResponse(
               CommonMessages.ERROR,
                null,
                RESPONSE_CODES.BAD_REQUEST
              ))
        }
    }
}  

