//Constante qui enregistre les framework de manipulation des requêtes entrantes et réponses courtes (express)
const express = require('express');
//Déclaration de la constante pour lancer la fonction
const app = express();
//Variable constante qui contiendra l'export du module body-parser
const bodyParser = require('body-parser')
//Je demande 
app.use(bodyParser.json())

//import des routes de l'application 
const dynamicRoutes = require ('./src/routes/dynamic_route')
const crafteurRoutes = require ('./src/routes/crafteur_route')
const dpsCacRoutes = require ('./src/routes/dpsContact_route')
const dpsMagicRoutes = require ('./src/routes/dpsMagiqueDistant_route')
const dpsPhysicRoutes = require ('./src/routes/dpsPhysiqueDistant_route')
const healerRoutes = require ('./src/routes/healer_route')
const recolteurRoutes = require ('./src/routes/recolteur_route')
const tankRoutes = require ('./src/routes/tank_route')
//Précision dynamic pour éviter conflit avec les autres routes. 
app.use("/dynamic", dynamicRoutes)
app.use(crafteurRoutes)
app.use(dpsCacRoutes)
app.use(dpsMagicRoutes)
app.use(dpsPhysicRoutes)
app.use(healerRoutes)
app.use(recolteurRoutes)
app.use(tankRoutes)
module.exports=app