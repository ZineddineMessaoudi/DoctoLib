const express = require("express")
const router = express.Router()
const { Facture, Patient } = require("../models")

//*** GET ALL Facture */
router.get("/", async (req, res) => {
  try {
    const factures = await Facture.findAll()
    if (factures.length === 0) {
      res.status(200).json({ message: "Il n'existe aucun Facture." })
    } else {
      res.status(200).json(factures)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** GET ONE Facture */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const facture = await Facture.findByPk(id)
    console.log(facture)
    res.status(200).json(facture)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** CREATE ONE Facture */
router.post("/create", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.body.patientId)
    if (!patient) {
      res.status(404).json({ message: "Patient not found" })
    }
    const facture = await Facture.create({
      facture_date: req.body.facture_date,
      montant: req.body.montant,
      patientId: req.body.patientId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(201).json(facture)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** UPDATE ONE Facture */
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id
    const facture = await Facture.findByPk(id)
    if (!facture) {
      res.status(404).json({ message: "Facture not found" })
    } else {
      const { facture_date, montant, patientId } = req.body
      const updatedPatient = await facture.update({
        facture_date: facture_date || facture.facture_date,
        montant: montant || facture.montant,
        patientId: patientId || facture.patientId,
        updatedAt: new Date(),
      })
      res.status(200).json(updatedPatient)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** DELETE ONE Facture */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const facture = await Facture.findByPk(id)
    if (!Facture) {
      res.status(404).json({ message: "Facture not found" })
    } else {
      await facture.destroy()
      res.status(200).json({ message: "Facture deleted" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
