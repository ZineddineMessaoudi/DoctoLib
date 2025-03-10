const db = require("../models")

/**
 * Middleware pour vérifier si l'utilisateur a le rôle requis
 * @param {string[]} roles - Liste des rôles autorisés
 * @returns {Function} Middleware Express
 */
const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await db.User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: db.Role,
            attributes: ["name"],
          },
        ],
      })

      if (!user || !user.Role) {
        return res.status(403).json({
          message: "Accès non autorisé : rôle non trouvé",
        })
      }

      if (!roles.includes(user.Role.name)) {
        return res.status(403).json({
          message: "Accès non autorisé : rôle insuffisant",
        })
      }

      next()
    } catch (error) {
      console.error("Erreur dans le middleware checkRole:", error)
      res.status(500).json({
        message: "Erreur lors de la vérification des droits d'accès",
      })
    }
  }
}

module.exports = {
  checkRole,
}
