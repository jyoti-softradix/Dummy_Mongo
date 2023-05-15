const mongoose = require('mongoose');
const Role = require('../models/roles');

mongoose.connect("mongodb://localhost:27017/Dummy_project", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create roles
    const adminRole = new Role({
      name: 'admin',
    });
    await adminRole.save();

    const userRole = new Role({
      name: 'user',
    });
    await userRole.save();

    console.log('Database seeded');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
