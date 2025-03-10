module.exports = (sequelize, DataTypes) => {
  const Praticien = sequelize.define("Praticien", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  })

  Praticien.associate = (models) => {
    Praticien.hasMany(models.Rdv, { foreignKey: "praticienId" })

    Praticien.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
    })
  }

  return Praticien
}
