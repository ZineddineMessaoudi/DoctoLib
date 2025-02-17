module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define("Facture", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    facture_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    montant: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  })

  return Facture
}
