const mongoose = require('mongoose');
const User = require('../models/user');
mongoose.connect("mongodb://localhost:27017/Dummy_project", {
    useNewUrlParser: true
})

.then(async () => {
  console.log('Connected to MongoDB');
    // Create the admin user
    const user = new User({
      _id: 1,
      first_name: 'Admin',
      last_name:'admin',
      email: 'admin@yopmail.com',
      phone_number:'8872113845',
      password: 'Admin@123',
      role_id: 1,
      status: 1,
      isAdmin: true
    });
    await user.save();
    console.log('Database seeded');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

