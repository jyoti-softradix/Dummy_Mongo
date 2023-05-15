import mongoose from "mongoose";
export default  class Auth {
  async init(db) {
    this.Models = db.models;
  }
  async checkEmail(email) {
    const result = await this.Models.Users.findOne({ email });
    return result;
  }

  async createUser(data) {
    return await this.Models.Users.create(data);
  }

  async getUserById(id) {
    const result = await this.Models.Users.findOne({ _id: id });
    return result;
  }
}
