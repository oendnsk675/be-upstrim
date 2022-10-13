'use strict';

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

     await queryInterface.bulkInsert('Payments', [
      {
          "name": "Bank Negara Indonesia (BNI)",
          "code": "BNI",
          "type": "Bank",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          "name": "Bank Central Asia (BCA)",
          "code": "BCA",
          "type": "Bank",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          "name": "Bank Rakyat Indonesia (BRI)",
          "code": "BRI",
          "type": "Bank",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          "name": "Gopay",
          "code": "GOPAY",
          "type": "E-Wallet",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          "name": "OVO",
          "code": "OVO",
          "type": "E-Wallet",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          "name": "DANA",
          "code": "DANA",
          "type": "E-Wallet",
          createdAt: new Date(),
          updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
