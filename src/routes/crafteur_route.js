const express = require('express');
const router = express.Router();
const crafteurController = require('../controller/crafteur_controller')

//POST
//Méthode pour créer une entrée
router.post("/crafteur", crafteurController.createCrafter)

//GET
//Méthode pour afficher le tableau
router.get("/crafteur", crafteurController.readCrafter)
//Méthode pour afficher par nom
router.get("/crafteur/name/:classe", crafteurController.readCrafterByName)
//Méthode pour afficher par ID
router.get("/crafteur/:id", crafteurController.readCrafterById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/crafteur/:id", crafteurController.updateCrafter)

//DELETE
//Méthode pour supprimer un métier
router.delete("/crafteur/:id", crafteurController.deleteCrafter)

module.exports = router