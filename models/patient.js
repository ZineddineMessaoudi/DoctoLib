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
  })

  Patient.associate = (models) => {
    Patient.hasMany(models.Facture, { foreignKey: "patientId" })

    Patient.hasMany(models.Rdv, { foreignKey: "patientId" })
  }

  return Patient
}
