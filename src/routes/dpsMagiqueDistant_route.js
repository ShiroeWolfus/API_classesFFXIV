const express = require('express');
const router = express.Router();
const dpsMagicController = require('../controller/dpsMagiqueDistant_controller')

//POST
//Méthode pour créer une entrée
router.post("/dpsMagic", dpsMagicController.createDpsMagic)

//GET
//Méthode pour afficher le tableau
router.get("/dpsMagic", dpsMagicController.readDpsMagic)
//Méthode pour afficher par nom
router.get("/dpsMagic/name/:classe", dpsMagicController.readDpsMagicByName)
//Méthode pour afficher par ID
router.get("/dpsMagic/:id", dpsMagicController.readDpsMagicById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/dpsMagic/:id", dpsMagicController.updateDpsMagic)

//DELETE
//Méthode pour supprimer un métier
router.delete("/dpsMagic/:id", dpsMagicController.deleteDpsMagic)

module.exports = router