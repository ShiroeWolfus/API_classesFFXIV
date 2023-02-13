Cours NodeJS
=========================
Ce cours utilise du code agnostique et générique afin de gérer les opérations de CRUD sur 1 fichiers JSON qui se trouve dans : 

````
src/model/job.json
````
Les codes source utilisé pour générer les réponses sont dans le dossier : 
````
src/controller/
````
la liste des routes comprenant les routes sont dans le dossier :
````
src/routes/
````

Les routes utilisées sont dynamiques mais existent également en version static
### Liste des routes
| Route | Verbe | Exemple | Explications |
|:-----|-----|-----|-----:|
|/:categorie |POST| htpp://localhost:3000/dynamic/tank | Cette route permet de créer une entrée dans un tableau dans un fichier| 
|/ |GET | htpp://localhost:3000/dynamic/ | Cette route permet de récupérer toutes les données dans un fichier| 
|/:classes |GET | htpp://localhost:3000/dynamic/recolteur | Cette route permet de récupérer toutes les données d'un tableau dans un fichier| 
|/:classes/:id |GET | htpp://localhost:3000/dynamic/healer | Cette route permet de récupérer toutes les données d'un tableau dans un fichier par son Id| 
|/:classes/name/:classe |GET | htpp://localhost:3000/healer/Mage Blanc | Cette route permet de récupérer les données d'un tableau dans un fichier par sa classe| 
|/:categorie/:id |PUT | htpp://localhost:3000/dynamic/dpsPhysic/2 | Cette route permet de mettre à jour toutes les données d'un tableau dans un fichier par son Id| 
|/:categorie/:id |Delete | htpp://localhost:3000/crafteur/5 | Cette route permet de supprimer les données d'une entrée d'un tableau dans un fichier par son Id| 
 
### Liste des librairies utilisées
| Librairie | Version | Raison | 
|:-----|----|-----:|
|Express |4.18.2 | Express sert de middleware pour manipuler les requêtes entrantes et les réponses courtes| 
|body-parser |1.20.1 | BodyParser va nous servir à accepter les données du body dans les requêtes entrantes| 
|fs | 0.0.1-security | Création et gestion des fichiers pour y stocker ou lire des fichiers dans un programme Node |
| nodemon | 2.0.20 |Nodemon nous sert uniquement pour le dev afin d'avoir un serveur en liverReload |

### Installation du projet
* Se placer à la racine du projet
* Ouvrir un terminal
* S'assurer d'avoir node d'installé via la commande dans le terminal
```
node -v
```
* installer les dépendances avec la commande dans le terminal
````
npm install
````
* installer les modules express et fs
````
npm install express fs
````
* installer le module nodemon avec les drapeaux pour la devDependencies
````
npm install nodemon --save-dev
````
permet d'éviter de surcharger l'application
### Manipulation du projet
* Installez l'extension Thunder Client sur VS Code
* Lancer une requête sous le format requis static ou dynamic dans l'entrée de route de la requête
````
http:localhost:3000/tank/Chevalier Noir
````
* Pour la version dynamique
````
http:localhost:3000/dynamic/healer/Mage Blanc
````
### Routes pour les chemins statics
* Tank
`````
http:localhost:3000/tank
`````
* Healer
`````
http:localhost:3000/healer
`````
* Dps au Corps à Corps
`````
http:localhost:3000/dpsCaC
`````
* Dps Physique
`````
http:localhost:3000/dpsPhysic
`````
* DPS Magique
`````
http:localhost:3000/dpsMagic
`````
* Crafteur
````
http:localhost:3000/crafteur
````
* Récolteur
````
http:localhost:3000/recolteur
````
