const express = require('express');
const router = express.Router();
const healerController = require('../controller/healer_controller')

//POST
//Méthode pour créer une entrée
router.post("/healer", healerController.createHealer)

//GET
//Méthode pour afficher le tableau
router.get("/healer", healerController.readHealer)
//Méthode pour afficher par nom
router.get("/healer/name/:classe", healerController.readHealerByName)
//Méthode pour afficher par ID
router.get("/healer/:id", healerController.readHealerById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/healer/:id", healerController.updateHealer)

//DELETE
//Méthode pour supprimer un métier
router.delete("/healer/:id", healerController.deleteHealer)

module.exports = router