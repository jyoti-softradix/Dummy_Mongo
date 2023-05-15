const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const saltRounds = require('../../config/keys');
const config = require('../../config/keys');
const saltRounds = config.saltRounds;
const User = new mongoose.Schema(
  {
    _id:{
      type: Number, 
    },
    first_name: { 
      type: String, 
      required: true 
    },
    last_name: { 
      type: String 
    },
    email: { 
      type: String,
      required: true,
    },
    phone_number: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role_id:{
      type : Number
    },
    status:{
      type: Number,
      default: 1
    },
    deleted_at: { 
      type: Date, 
      required: false 
    }
  },
  { timestamps: true}
);
User.pre("save",async function (done){
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this._id = count + 1;
  }
  if(this.isModified("password")){
    const hashed = await bcrypt.hash(this.password, saltRounds);
     this.set("password",hashed)
  }
done();
}),
User.pre("insertMany",async function(done){
  if(this.isModified("password")){
    const hashed = await bcrypt.hash(this.password, saltRounds);
     this.set("password",hashed)
  }
done();
}),
module.exports = mongoose.model("user", User);
