"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    })

    // 2. Insérer les rôles par défaut
    const roles = await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "praticien",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    )

    // 3. Ajouter la colonne roleId comme nullable initialement
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })

    const patientRole = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'patient'`
    )
    const patientRoleId = patientRole[0][0].id

    await queryInterface.sequelize.query(
      `UPDATE Users SET roleId = ${patientRoleId} WHERE roleId IS NULL`
    )

    await queryInterface.changeColumn("Users", "roleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "roleId")

    await queryInterface.dropTable("Roles")
  },
}
