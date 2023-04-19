import Auth from "./Auth/index";
export default class Routes{
    constructor(router,db){
        this.router = router;
        this.DatabaseConnect = db;
    }

    async routesRegistration(){
        this.db = await this.DatabaseConnect.getDB();

        this.auth = new Auth(this.router,this.db);
        await this.auth.routes()
    }
}