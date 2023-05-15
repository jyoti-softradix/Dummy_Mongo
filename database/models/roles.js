const mongoose = require( "mongoose");
const roles = new mongoose.Schema(
    {
        _id: { 
            type: Number, 
          },
        name: { 
            type: String, 
          },
    },
    { timestamps: true}
  );
  roles.pre("save",async function(done){
    if (this.isNew) {
      const count = await this.constructor.countDocuments();
      this._id = count + 1;
    }
  done();
  }),
  module.exports = mongoose.model("role", roles);