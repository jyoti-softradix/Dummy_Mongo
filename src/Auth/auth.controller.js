export default class Auth {
    async init(db) {
      this.services = new Services();
      this.Models = db.models;
      await this.services.init(db);
    }

    async userSignup (req,res){
        // const {body} = req;
        // try{
            res.status(200).json({msg: "Success"})
        // }catch(error){
        //     res.status(500).json("ERROR", error.message)
        // }
    }
}  