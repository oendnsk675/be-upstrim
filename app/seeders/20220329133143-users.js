'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        name: "administrator",
        username: "admin",
        email: "admin.upstrim@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        phone: "081917320971",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "osi",
        username: "osi_nineteen",
        email: "sayidinaahmadalqososyi@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        phone: "081917320977",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "dawi",
        username: "badawi",
        email: "badawi@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        phone: "081917320972",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
