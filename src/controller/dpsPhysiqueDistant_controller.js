//Constante pour la lecture des fichier (fs)
const fs = require('fs');

//Méthode CRUD pour le tableau DpsPhysique

//Creation
//Création d'un nouveau fichier
exports.createDpsPhysic = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Tu tapes de loin mais tu lis pas les erreurs de lecture d'aussi loin.", 
                error: err,
            })
        }else{
            const DpsPhysicExistant = JSON.parse(job);
            const DpsPhysicExistantId = DpsPhysicExistant.classes.dpsPhysiqueDistant.map(
                (obj)=>obj.id
                )
            const idMax = Math.max(...DpsPhysicExistantId)
            DpsPhysicExistant.classes.dpsPhysiqueDistant.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(DpsPhysicExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Une nouvelle aventure mais pas pour toi. Vas relire ton code",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "Parfois l'arière garde fais des miracles. Bienvenue à toi nouvelle recrue"
                    })
                }
            })
        }
    })
}

//Read
//Read tous les métiers du tableau
exports.readDpsPhysic = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "T'as pas lu le panneau. Reviens en arrière et check la map",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(job).classes.dpsPhysiqueDistant)
        };
    })
}

//Read 
//lecture d'un métier de la liste par son id
exports.readDpsPhysicById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                response: "Ditant mais tellement loin que le métier a une erreur de lecture, ou le code ou les 2",
                error: err,
            })
        } else {
            const DpsPhysicExistant=JSON.parse(job).classes.dpsPhysiqueDistant.find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(DpsPhysicExistant){
                response.status(200).json(DpsPhysicExistant)
            }else {
                response.status(404).json({
                    message:"T'es pas un sniper c'est sûr. Vérifie la route",
                    error: err,
                });
            }
        }
    });
}

//Read
//Lecture d'un métier par son nom
exports.readDpsPhysicByName =(request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Presque mais t'as tiré à côté. Erreur de lecture certainement",
                error: err,
            })
        }else{
            const DpsPhysicExistant=JSON.parse(job).classes.dpsPhysiqueDistant.find(
                (obj)=>obj.classe === request.params.classe
            );
            if(DpsPhysicExistant){
                response.status(200).json(DpsPhysicExistant)
            }else{
                response.status(404).json({
                    message: "Reprends-toi. Souffle, respire et vérifie qu'on est bon. Là y a rien",
                    error: err,
                })
            }
        }
    })
}

//Update
//modifier les infos d'un métier existant par son Id
exports.updateDpsPhysic = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message:"Erreur de lecture. Pas top pour un dps Physique Distant",
                error: err,
            })
        }else{
            const DpsPhysicExistant = JSON.parse(job);
            const DpsPhysicPerRank = DpsPhysicExistant.classes.dpsPhysiqueDistant.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!DpsPhysicPerRank){
                response.status(404).json({
                    message : "Tire à blanc. On a rien touché ici. Faut essayer encore",
                    error: err,
                })
            } else {
                DpsPhysicPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(DpsPhysicExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Non vraiment tu ne sais pas lire",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Matériel upgrade. Tu peux repartir batailler",
                        })
                    }
                })
            }
        }
    })
}

// Delete
//supprime une entrée métier dps physique 
exports.deleteDpsPhysic = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.statut(500).json({
                message: "Un morceau du code a disparu ou est mal écris en tout cas erreur de lecture",
                error: err,
            })
        }else{
            const DpsPhysicExistant = JSON.parse(job)
            const DpsPhysicPerRank = DpsPhysicExistant.classes.dpsPhysiqueDistant.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!DpsPhysicPerRank){
                response.status(404).json({
                    message: "Rien, wallou, nada. On a rien trouvé chef",
                    error: err,
                })
            }else{
                DpsPhysicExistant.classes.dpsPhysiqueDistant = DpsPhysicExistant.classes.dpsPhysiqueDistant.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(DpsPhysicExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Je crois que la lecture en s'est pas faite. Dur le livre à l'envers",
                            error: err,
                        })
                    } else{
                        response.status(200).json({
                            message: "La retraite touche les meileurs d'entre nous. Il était temps pour ce métier de disparaître"
                        })
                    }      
                })
            }
        }
    })
}
