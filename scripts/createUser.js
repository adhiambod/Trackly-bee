// scripts/createUser.js

import sequelize from '../sequelize.js'; // Adjust the path based on your directory structure
import db from '../backend/models/index.js'; // Import the models

const run = async () => {
  try {
    await sequelize.sync(); // Sync the models with the database

    const user = await db.User.create({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      password: 'hashed_password', // Hash the password for production
    });

    console.log(user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

run().catch(console.error);
