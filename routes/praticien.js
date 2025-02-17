const express = require("express")
const router = express.Router()
const { Praticien } = require("../models")

//*** GET ALL Praticien */
router.get("/", async (req, res) => {
  try {
    const praticiens = await Praticien.findAll()
    if (praticiens.length === 0) {
      res.status(200).json({ message: "Il n'existe aucun Praticien." })
    } else {
      res.status(200).json(praticiens)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** GET ONE Praticien */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const praticien = await Praticien.findByPk(id)
    console.log(praticien)
    res.status(200).json(praticien)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** CREATE ONE Praticien */
router.post("/create", async (req, res) => {
  try {
    const praticien = await Praticien.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      adresse: req.body.adresse,
      specialite: req.body.specialite,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(201).json(praticien)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** UPDATE ONE Praticien */
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id
    const praticien = await Praticien.findByPk(id)
    if (!praticien) {
      res.status(404).json({ message: "Praticien not found" })
    } else {
      const { firstname, lastname, birthdate, adresse, specialite } = req.body
      const updatedPatient = await praticien.update({
        firstname: firstname || praticien.firstname,
        lastname: lastname || praticien.lastname,
        adresse: adresse || praticien.adresse,
        specialite: specialite || praticien.specialite,
        updatedAt: new Date(),
      })
      res.status(200).json(updatedPatient)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//*** DELETE ONE Praticien */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const praticien = await Praticien.findByPk(id)
    if (!Praticien) {
      res.status(404).json({ message: "Praticien not found" })
    } else {
      await praticien.destroy()
      res.status(200).json({ message: "Praticien deleted" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
