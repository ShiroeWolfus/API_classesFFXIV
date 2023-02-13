const express = require('express');
const router = express.Router();
const dpsPhysicController = require('../controller/dpsPhysiqueDistant_controller')

//POST
//Méthode pour créer une entrée
router.post("/dpsPhysic", dpsPhysicController.createDpsPhysic)

//GET
//Méthode pour afficher le tableau
router.get("/dpsPhysic", dpsPhysicController.readDpsPhysic)
//Méthode pour afficher par nom
router.get("/dpsPhysic/name/:classe", dpsPhysicController.readDpsPhysicByName)
//Méthode pour afficher par ID
router.get("/dpsPhysic/:id", dpsPhysicController.readDpsPhysicById)

//PUT
//Méthode pour mettre à jour un métier
router.put("/dpsPhysic/:id", dpsPhysicController.updateDpsPhysic)

//DELETE
//Méthode pour supprimer un métier
router.delete("/dpsPhysic/:id", dpsPhysicController.deleteDpsPhysic)

module.exports = router