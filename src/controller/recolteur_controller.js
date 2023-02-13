//Constante pour la lecture des fichier (fs)
const fs = require('fs');

//Méthode CRUD pour le tableau recolteur

//Creation
//Création d'un nouveau fichier
exports.createRecolteur = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "On ne récolte que ce que l'on sème et là t'as pas grand chose. Erreur de récolte.", 
                error: err,
            })
        }else{
            const recolteurExistant = JSON.parse(metier);
            const recolteurExistantId = recolteurExistant.classes.recolteur.map(
                (obj)=>obj.id
                )
            const idMax = Math.max(...recolteurExistantId)
            recolteurExistant.classes.recolteur.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(recolteurExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Le récolteur ne sait pas lire",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "Vous avez un nouveau métier de récolte"
                    })
                }
            })
        }
    })
}

//Read
//Read tous les récolteurs du tableau
exports.readRecolteur = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "Ton point de récolte est pas sur la carte. Erreur de lecture",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(metier).classes.recolteur)
        };
    })
}

//Read 
//lecture d'une entrée de récolteur de la liste par son id
exports.readRecolteurById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                response: "La récolte n'a pas eu lieu. Tu as une erreur de lecture",
                error: err,
            })
        } else {
            const recolteurExistant=JSON.parse(metier).classes.recolteur.find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(recolteurExistant){
                response.status(200).json(recolteurExistant)
            }else {
                response.status(404).json({
                    message:"C'est le mauvais plant de récolte. Cherches en un autre!",
                    error: err,
                });
            }
        }
    });
}

//Read
//Lecture d'un métier de récolteur par son nom
exports.readRecolteurByName =(request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "La récolte est gâtée. Un autre idée peut être, une erreur de lecture sur la mode d'emploi",
                error: err,
            })
        }else{
            const recolteurExistant=JSON.parse(metier).classes.recolteur.find(
                (obj)=>obj.classe === request.params.classe
            );
            if(recolteurExistant){
                response.status(200).json(recolteurExistant)
            }else{
                response.status(404).json({
                    message: "Ce métier n'existe pas faut faire attention à l'orthographe.",
                    error: err,
                })
            }
        }
    })
}

//Update
//modifier les infos d'un métier de récolte existant par son Id
exports.updateRecolteur = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message:"La lecture de la récolte a rencontré une erreur innatendue",
                error: err,
            })
        }else{
            const recolteurExistant = JSON.parse(metier);
            const recolteurPerRank = recolteurExistant.classes.recolteur.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!recolteurPerRank){
                response.status(404).json({
                    message : "Va falloir arroser les récoltes sinon on ne pourra pas les trouver ici.",
                    error: err,
                })
            } else {
                recolteurPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(recolteurExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Erreur de lecture dans la mare de café. Récolte mauvaise",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Beau coup de pioche ou pelle mais le job a été mis à jour",
                        })
                    }
                })
            }
        }
    })
}

// Delete
//supprime une entrée du métier dans le tableau de récolteur
exports.deleteRecolteur = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.statut(500).json({
                message: "L'erreur de lecture est présente et la récolte absente",
                error: err,
            })
        }else{
            const recolteurExistant = JSON.parse(metier)
            const recolteurPerRank = recolteurExistant.classes.recolteur.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!recolteurPerRank){
                response.status(404).json({
                    message: "Aucune récolte ici. Dommage essaye encore",
                    error: err,
                })
            }else{
                recolteurExistant.classes.recolteur = recolteurExistant.classes.recolteur.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(recolteurExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "la récolte rencontre une erreur de lecture",
                            error: err,
                        })
                    } else{
                        response.status(200).json({
                            message: "Le métier est remplacé par une machine. Au chômage l'agriculteur"
                        })
                    }      
                })
            }
        }
    })
}
