const express = require('express');
const router = express.Router();
const tankController = require('../controller/tank_controller')

//POST
//Méthode pour créer une entrée
router.post("/tank", tankController.createTank)

//GET
//Méthode pour afficher le tableau
router.get("/tank", tankController.readTank)
//Méthode pour afficher par nom
router.get("/tank/name/:classe", tankController.readTankByName)
//Méthode pour afficher par ID
router.get("/tank/:id", tankController.readTankById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/tank/:id", tankController.updateTank)

//DELETE
//Méthode pour supprimer un métier
router.delete("/tank/:id", tankController.deleteTank)

module.exports = router