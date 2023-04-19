import authController from "./auth.controller";
export default  class auth{
    constructor(router,db){
        this.router = router;
        this.db = db;
        this.authInstance = new authController();
    }
    async routes(){
        await this.authInstance.init(this.db);

        this.router.get('/auth/signup', (req,res)=>{this.authInstance.userSignup(req,res)})
    }

}