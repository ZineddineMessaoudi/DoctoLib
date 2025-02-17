module.exports = (sequelize, DataTypes) => {
  const Rdv = sequelize.define("Rdv", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rdv_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    heure_debut: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isBeforeHeureFin(value) {
          if (this.heure_fin <= value) {
            throw new Error("L'heure de debut doit être avant l'heure de fin")
          }
        },
      },
    },
    heure_fin: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isAfterHeureDebut(value) {
          if (this.heure_debut >= value) {
            throw new Error("L'heure de fin doit être après l'heure de début")
          }
        },
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    praticienId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Praticiens",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  })

  Rdv.associate = (models) => {
    Rdv.belongsTo(models.Patient, { foreignKey: "patientId" })

    Rdv.belongsTo(models.Praticien, { foreignKey: "praticienId" })
  }

  return Rdv
}
