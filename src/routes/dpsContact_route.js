const express = require('express');
const router = express.Router();
const dpsCaCController = require('../controller/dpsContact_controller')

//POST
//Méthode pour créer une entrée
router.post("/dpsCaC", dpsCaCController.createDpsCac)

//GET
//Méthode pour afficher le tableau
router.get("/dpsCaC", dpsCaCController.readDpsCac)
//Méthode pour afficher par nom
router.get("/dpsCaC/name/:classe", dpsCaCController.readDpsCacByName)
//Méthode pour afficher par ID
router.get("/dpsCaC/:id", dpsCaCController.readDpsCacById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/dpsCaC/:id", dpsCaCController.updateDpsCac)

//DELETE
//Méthode pour supprimer un métier
router.delete("/dpsCaC/:id", dpsCaCController.deleteDpsCac)

module.exports = router