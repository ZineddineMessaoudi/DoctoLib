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
  })

  Praticien.associate = (models) => {
    Praticien.hasMany(models.Rdv, { foreignKey: "praticienId" })
  }

  return Praticien
}
