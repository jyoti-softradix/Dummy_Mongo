import Services from './user.services';
export default class User {
    async init(db) {
        this.services = new Services();
        this.Models = db.models;
        await this.services.init(db);
      }
      
   async deleteUser (req,res){
    const { params } = req;
    try{
        const checkUser = await this.services.findUserById(params)
        if(checkUser){
            const user =  await this.services.deleteUserById(params)
            res.status(200).send({msg: "User removed successfully", data: user})
        }else{
            res.status(400).send({msg: "User not found"})
        }  
    }catch(error){
        res.status(500).send({msg: error.message})
    }
   }
   async updateUser (req,res){
    const { body, params } = req;
    try{
        // const checkUser = await this.services.findUserById(params)
        // if(!checkUser){
        //     res.status(400).send({msg: "User not found"})
        // }
        const payload = {
            first_name: body.first_name,
            last_name: body.last_name,
            phone_number: body.phone_number,
        }
        const user =  await this.services.editUserById({params},{payload} )
        if(!user){
            res.status(400).send({msg: "User not found"})
        }
        console.log(user, "=====user======")
        res.status(200).send({msg: "User's profile updated successfully"})
    }catch(error){
        res.status(500).send({msg: error.message})
    }
   }
//    async getUser (req,res){
//     try{

//     }catch(error){
//         console.log(error)
//         res.status(500).send({msg: error.message})
//     }
//    }
}