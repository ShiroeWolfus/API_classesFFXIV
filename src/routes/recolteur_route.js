const express = require('express');
const router = express.Router();
const recolteurController = require('../controller/recolteur_controller')

//POST
//Méthode pour créer une entrée
router.post("/recolteur", recolteurController.createRecolteur)

//GET
//Méthode pour afficher le tableau
router.get("/recolteur", recolteurController.readRecolteur)
//Méthode pour afficher par nom
router.get("/recolteur/name/:classe", recolteurController.readRecolteurByName)
//Méthode pour afficher par ID
router.get("/recolteur/:id", recolteurController.readRecolteurById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/recolteur/:id", recolteurController.updateRecolteur)

//DELETE
//Méthode pour supprimer un métier
router.delete("/recolteur/:id", recolteurController.deleteRecolteur)

module.exports = router