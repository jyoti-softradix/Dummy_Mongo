export default  class User {
  async init(db) {
    this.Models = db.models;
  }

    findUserById = async (data) => {
        const result =  await userModel.findOne({_id:data.id});
        return result
      };

    deleteUserById = async (data) => {
        const result =  await userModel.deleteOne({_id:data.id});
        return result
      };

    editUserById = async (record) => {
      const result =  await userModel.findByIdAndUpdate({_id:record.id});
      return result
    };
}