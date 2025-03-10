module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
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
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adresse: {
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

  Patient.associate = (models) => {
    Patient.hasMany(models.Facture, { foreignKey: "patientId" })

    Patient.hasMany(models.Rdv, { foreignKey: "patientId" })

    Patient.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
    })
  }

  return Patient
}
