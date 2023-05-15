import authController from "./auth.controller";
import Authorization from "../helper/authorization";
import { getAccessRoles } from "../helper/commonFunction";

export default class auth{
    constructor(router, db){
        this.router = router;
        this.authInstance = new authController();
        this.authorization = new Authorization();
        this.db = db;
    }
    async routes(){
        await this.authInstance.init(this.db);
        await this.authorization.init(this.db);
        let userAccess = await getAccessRoles(this.db);
        this.router.post('/login', (req,res)=>{this.authInstance.login(req,res)})
        this.router.post('/auth/signup', await this.authorization.authorize([userAccess.Admin]), (req,res)=>{this.authInstance.signup(req,res)})
    }
}
