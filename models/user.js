module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.associate = (models) => {
    User.hasOne(models.Patient, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "CASCADE",
    })

    User.hasOne(models.Praticien, {
      foreignKey: {
        name: "userId",
        allowNull: true,
      },
      onDelete: "CASCADE",
    })
  }

  return User
}
