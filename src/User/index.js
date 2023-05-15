import userController from './user.controller';
import Authorization from '../helper/authorization';
import { getAccessRoles } from '../helper/commonFunction';
export default class User {
        constructor(router, db){
            this.router = router;
            this.userInstance = new userController();
            this.authorization = new Authorization();
            this.db = db;
        }
    
    async routes(){
        await this.userInstance.init(this.db);
        await this.authorization.init(this.db);
        let userAccess = await getAccessRoles(this.db);

        this.router.delete('/user/delete/:id', (req,res)=>{this.userInstance.deleteUser(req,res)})
        this.router.put('/user/edit/:id', (req,res)=>{this.userInstance.updateUser(req,res)})
    }
}