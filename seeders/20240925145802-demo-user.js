'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password', // Remember to hash passwords in a real app
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
