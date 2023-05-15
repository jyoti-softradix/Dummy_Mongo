import { RESPONSE_CODES } from '../../config/constants';
import { CommonMessages } from '../../constants/common';
import { verifyToken } from './jwt';
export default class Authorization {
    async init(db) {
            this.Models = db.models;
      }


  async authorize(roles = []) {
    return [
      async (req, res, next) => {
        /** Decode JWT Token */
        const decoded = verifyToken(req.headers.authorization);

        req.decoded = decoded;

        if (decoded === "jwt expired" || !req.headers.authorization) {
          return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
            status: 0,
            code: RESPONSE_CODES.UNAUTHORIZED,
            message: CommonMessages.UNAUTHORIZED_USER,
            data: null,
          });
        }

        /** Check user authorization */
        if(decoded == "invalid jwt"){
          return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
            status: 0,
            code: RESPONSE_CODES.UNAUTHORIZED,
            message: CommonMessages.UNAUTHORIZED_USER,
            data: null,
          });
        }

        if (decoded != "invalid signature") {
          /** check user exist or not */
          const user = await this.Models.Users.findOne({email: decoded.email});
          if (!user) {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
              status: 0,
              code: RESPONSE_CODES.UNAUTHORIZED,
              message: CommonMessages.UNAUTHORIZED_USER,
              data: null,
            });
          }
       
          /** Check user authorization */
          if (roles && roles.length > 0 && roles.includes(decoded.role_id)) {
            const user = await this.Models.Users.findOne({ email: decoded.email, role_id: decoded.role_id });
            if (!user) {
              return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
                status: 0,
                code: RESPONSE_CODES.UNAUTHORIZED,
                message: CommonMessages.UNAUTHORIZED_USER,
                data: null,
              });
            }
        console.log(6)

            req.user = user;
            next();
          } else {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
              status: 0,
              code: RESPONSE_CODES.UNAUTHORIZED,
              message: CommonMessages.UNAUTHORIZED_USER,
              data: null,
            });
          }
        }
      },
    ];
  }
}
