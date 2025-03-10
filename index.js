const express = require("express")
const bodyParser = require("body-parser")
const { Sequelize } = require("sequelize")
const db = require("./models")
const { authenticateUser } = require("./middleware/auth.middleware")

const app = express()
const port = 3000

app.use(bodyParser.json())

db.sequelize.sync().then(() => {
  console.log("Connexion à la base de données réussie")
})

/**
 * Configuration des routes pour l'authentification
 * @const {Object} authRoutes - Router Express pour les endpoints d'authentification
 */
const authRoutes = require("./routes/auth")
app.use("/auth", authRoutes)

/**
 * Configuration des routes pour les patients
 * @const {Object} patientRoutes - Router Express pour les endpoints patients
 */
const patientRoutes = require("./routes/patient")
app.use("/patient", authenticateUser, patientRoutes)

/**
 * Configuration des routes pour les praticiens
 * @const {Object} praticienRoutes - Router Express pour les endpoints praticiens
 */
const praticienRoutes = require("./routes/praticien")
app.use("/praticien", authenticateUser, praticienRoutes)

/**
 * Configuration des routes pour les factures
 * @const {Object} factureRoutes - Router Express pour les endpoints factures
 */
const factureRoutes = require("./routes/facture")
app.use("/facture", authenticateUser, factureRoutes)

/**
 * Configuration des routes pour les rendez-vous
 * @const {Object} rdvRoutes - Router Express pour les endpoints rendez-vous
 */
const rdvRoutes = require("./routes/rdv")
app.use("/rdv", authenticateUser, rdvRoutes)

app.use(({ res }) => {
  const message = "La page n'existe pas !"
  res.status(404).json({ message })
})

app.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`)
})
