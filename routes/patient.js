const express = require("express")
const router = express.Router()
const { Patient } = require("../models")

//*** GET ALL PATIENT */
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll()
    if (patients.length === 0) {
      res.status(200).json({ message: "Il n'existe aucun patient." })
    } else {
      res.status(200).json(patients)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** GET ONE PATIENT */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const patient = await Patient.findByPk(id)
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** CREATE ONE PATIENT */
router.post("/create", async (req, res) => {
  try {
    const patient = await Patient.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate,
      adresse: req.body.adresse,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(201).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** UPDATE ONE PATIENT */
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id
    const patient = await Patient.findByPk(id)
    if (!patient) {
      res.status(404).json({ message: "Patient not found" })
    } else {
      const { firstname, lastname, birthdate, adresse } = req.body
      const updatedPatient = await patient.update({
        firstname: firstname || patient.firstname,
        lastname: lastname || patient.lastname,
        birthdate: birthdate || patient.birthdate,
        adresse: adresse || patient.adresse,
        updatedAt: new Date(),
      })
      res.status(200).json(updatedPatient)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** DELETE ONE PATIENT */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const patient = await Patient.findByPk(id)
    if (!patient) {
      res.status(404).json({ message: "Patient not found" })
    } else {
      await patient.destroy()
      res.status(200).json({ message: "Patient deleted" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
