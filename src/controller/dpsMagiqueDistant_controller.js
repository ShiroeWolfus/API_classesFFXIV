//Constante pour la lecture des fichier (fs)
const fs = require('fs')

//Utilisation du CRUD pour le tableau dpsMagic

//Création
//Méthode Post
exports.createDpsMagic = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Ta lecture est corrompue par les ombres Andy. (Heart of Darkness)",
                error: err,
            })
        }else{
            const dpsMagicExistant = JSON.parse(job);
            const dpsMagicId = dpsMagicExistant.classes.dpsMagiqueDistant.map(
                (obj)=> obj.id
            )
            const idMax = Math.max(...dpsMagicId)
            dpsMagicExistant.classes.dpsMagiqueDistant.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(dpsMagicExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Tu t'es perdu. N'oublie pas ta carte.",
                        error: err,
                    })
                }else{
                    response.status(200).json({
                        message: "Excellent, tu as crée une entrée mais n'oublie pas l'échange équivalent Edward"
                    })
                }
            })
        }
    })
}

//Read
//Lecture des métiers du tableau
exports.readDpsMagic = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Faut lire dans l'ordre",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(job).classes.dpsMagiqueDistant)
        }
    })
}

//Read2 
//Affichage d'une entrée de la liste par son ID
exports.readDpsMagicById=(request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Dans la vie il y a ceux qui lisent et ceux qui creusent. Toi tu creuses!",
                error: err, 
            })
        }else{
            const dpsMagicExistant=JSON.parse(job).classes.dpsMagiqueDistant.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(dpsMagicExistant){
                response.status(200).json(dpsMagicExistant)
            }else{
                response.status(404).json({
                    message: "Là où nous allons nous n'avons pas besoin de cet id",
                    error: err,
                })
            }
        }
    })
}

//Read3
//Affichage d'une entrée du tableau par son nom
exports.readDpsMagicByName=(request, response)=>{
    fs.readFile("./src/model/job.json", (err,job)=>{
        if(err){
            response.status(500).json({
                message: "Le vide, l'absence mais surtout pas le résultat",
                error: err,
            })
        }else{
            const dpsMagicExistant = JSON.parse(job).classes.dpsMagiqueDistant.find(
                (obj)=>obj.classe === request.params.classe
            )
            if(dpsMagicExistant){
                response.status(200).json(dpsMagicExistant)
            }else{
                response.status(404).json({
                    message: "Le job est magique mais n'existe pas",
                    error: err,
                })
            }
        }
    })
}

//Update
//modifier les infos d'un métier existant par son Id
exports.updateDpsMagic = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message:"La lecture de la magie a été compromise",
                error: err,
            })
        }else{
            const dpsMagicExistant = JSON.parse(metier);
            const dpsMagicPerRank = dpsMagicExistant.classes.dpsMagiqueDistant.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!dpsMagicPerRank){
                response.status(404).json({
                    message : "Vtech : Dommage! Essaye encore.",
                    error: err,
                })
            } else {
                dpsMagicPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(dpsMagicExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Rejoins le côté obscur de la force Luke!",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Mis à jour le job a été (Maître Yoda)",
                        })
                    }
                })
            }
        }
    })
}

// Delete
//supprime une métier 
exports.deleteDpsMagic = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.statut(500).json({
                message: "Ce n'est pas le métier qui est effacé mais le morceau de code pour lire le fichier qui a été éffacé",
                error: err,
            })
        }else{
            const dpsMagicExistant = JSON.parse(metier)
            const dpsMagicPerRank = dpsMagicExistant.classes.dpsMagiqueDistant.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!dpsMagicPerRank){
                response.status(404).json({
                    message: "Kupo, aucun métier trouvé ici. Avec un autre idée kupo",
                    error: err,
                })
            }else{
                dpsMagicExistant.classes.dpsMagiqueDistant = dpsMagicExistant.classes.dpsMagiqueDistant.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(dpsMagicExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "erreur de lecture du fichier. Rendez-vous en page 23",
                            error: err,
                        })
                    } else{
                        response.status(200).json({
                            message: "Le métier est parti à la retraite. Son obsoléscence a été prouvé et ne peux plus être utilisé"
                        })
                    }      
                })
            }
        }
    })
}