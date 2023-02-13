const express = require('express');
const router = express.Router();
const dynamicController = require ('../controller/dynamic_controller')

//POST
//Méthode pour créer une entrée
router.post("/:categorie",dynamicController.createData);

//GET
//Méthode pour afficher la base de données
router.get("/", dynamicController.readAllData)
//get pour un tableau en particulier de la base de données
router.get('/:classes', dynamicController.readData) 
//Méthode pour obtenir un objet par manipulation du JSON et des données
router.get("/:categorie/name/:classe", dynamicController.readDataByName) 
//Méthode pour obtenir un objet par manipulation du JSON et des données
router.get("/:categorie/:id", dynamicController.readDataById)
//PUT
//Méthode pour mettre à jour une entrée
router.put("/:categorie/:id", dynamicController.updateData)
//DELETE
//Méthode pour supprimer une entrée
router.delete("/:categorie/:id", dynamicController.deleteData)

module.exports = router