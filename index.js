const express = require("express")
const bodyParser = require("body-parser")
const { Sequelize } = require("sequelize")
const db = require("./models")

const app = express()
const port = 3000

app.use(bodyParser.json())

db.sequelize.sync().then(() => {
  console.log("Connexion à la base de données réussie")
})

const patientRoutes = require("./routes/patient")
app.use("/patient", patientRoutes)

const praticienRoutes = require("./routes/praticien")
app.use("/praticien", praticienRoutes)

const factureRoutes = require("./routes/facture")
app.use("/facture", factureRoutes)

const rdvRoutes = require("./routes/rdv")
app.use("/rdv", rdvRoutes)

app.use(({ res }) => {
  const message = "La page n'existe pas !"
  res.status(404).json({ message })
})

app.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`)
})
