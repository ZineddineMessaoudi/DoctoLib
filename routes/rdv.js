const express = require("express")
const router = express.Router()
const { Rdv } = require("../models")

//*** GET ALL Rdv */
router.get("/", async (req, res) => {
  try {
    const rdvs = await Rdv.findAll()
    if (rdvs.length === 0) {
      res.status(200).json({ message: "Il n'existe aucun Rdv." })
    } else {
      res.status(200).json(rdvs)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** Définir une dispo de Rdv */
router.post("/", async (req, res) => {
  try {
    const rdv = await Rdv.create({
      rdv_date: req.body.rdv_date,
      heure_debut: req.body.heure_debut,
      heure_fin: req.body.heure_fin,
      praticienId: req.body.praticienId,
      patientId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(201).json(rdv)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** Get rdv dispo */
router.get("/:praticienId/:libre", async (req, res) => {
  try {
    console.log(req.params)
    if (req.params.libre === "true") {
      const rdvs = await Rdv.findAll({
        where: {
          praticienId: req.params.praticienId,
          patientId: null,
        },
      })
      res.status(200).json(rdvs)
    } else {
      res.status(404).json({ message: "Rdv not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** GET ONE Rdv */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const rdv = await Rdv.findByPk(id)
    console.log(rdv)
    res.status(200).json(rdv)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** CREATE ONE Rdv */
router.post("/create", async (req, res) => {
  try {
    const rdv = await Rdv.create({
      rdv_date: req.body.rdv_date,
      patientId: req.body.patientId,
      praticienId: req.body.praticienId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(201).json(rdv)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** UPDATE ONE Rdv */
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id
    const rdv = await Rdv.findByPk(id)
    if (!rdv) {
      res.status(404).json({ message: "Rdv not found" })
    } else {
      const { rdv_date, heure_debut, heure_fin, patientId, praticienId } =
        req.body
      const updatedPatient = await rdv.update({
        rdv_date: rdv_date || rdv.rdv_date,
        heure_debut: heure_debut || rdv.heure_debut,
        heure_fin: heure_fin || rdv.heure_fin,
        patientId: patientId || rdv.patientId,
        praticienId: praticienId || rdv.praticienId,
        updatedAt: new Date(),
      })
      res.status(200).json(updatedPatient)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** DELETE ONE Rdv */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const rdv = await Rdv.findByPk(id)
    if (!Rdv) {
      res.status(404).json({ message: "Rdv not found" })
    } else {
      await rdv.destroy()
      res.status(200).json({ message: "Rdv deleted" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
