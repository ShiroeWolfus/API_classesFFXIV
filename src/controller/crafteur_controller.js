//Constante pour la lecture des fichier (fs)
const fs = require('fs');

//Méthode CRUD pour le tableau crafteur

//Creation
//Création d'un nouveau fichier
exports.createCrafter = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "Je crois que tu t'es tapé sur les doigts avec ton marteau. Lecture fantôme", 
                error: err,
            })
        }else{
            const crafteurExistant = JSON.parse(metier);
            const crafteurExistantId = crafteurExistant.classes.crafteur.map(
                (obj)=>obj.id
                )
            const idMax = Math.max(...crafteurExistantId)
            crafteurExistant.classes.crafteur.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(crafteurExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Epic fail! Va falloir revoir ton code ou ta rotation",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "You win. Perfect. Script garanted"
                    })
                }
            })
        }
    })
}

//Read
//Read tous les métiers du tableau
exports.readCrafter = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "T'as pas lu le panneau. Reviens en arrière et check la map",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(metier).classes.crafteur)
        };
    })
}

//Read 
//lecture d'un métier de la liste par son id
exports.readCrafterById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                response: "Je ne crois pas que ce métier ait encore été développé par l'équipe. Cherche en un autre",
                error: err,
            })
        } else {
            const crafteurExistant=JSON.parse(metier).classes.crafteur.find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(crafteurExistant){
                response.status(200).json(crafteurExistant)
            }else {
                response.status(404).json({
                    message:"C'est le mauvais Id que tu as voulu fabriquer. Dommage. Essaie encore!",
                    error: err,
                });
            }
        }
    });
}

//Read
//Lecture d'un métier par son nom
exports.readCrafterByName =(request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message: "Non ce n'est pas Sésame ouvre-toi. Un autre idée peut être",
                error: err,
            })
        }else{
            const crafteurExistant=JSON.parse(metier).classes.crafteur.find(
                (obj)=>obj.classe === request.params.classe
            );
            if(crafteurExistant){
                response.status(200).json(crafteurExistant)
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
//modifier les infos d'un métier existant par son Id
exports.updateCrafter = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.status(500).json({
                message:"La lecture de la matrice a été compromise",
                error: err,
            })
        }else{
            const crafteurExistant = JSON.parse(metier);
            const crafteurPerRank = crafteurExistant.classes.crafteur.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!crafteurPerRank){
                response.status(404).json({
                    message : "Vtech : Dommage! Essaye encore.",
                    error: err,
                })
            } else {
                crafteurPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(crafteurExistant), (writeErr)=>{
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
exports.deleteCrafter = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, metier)=>{
        if(err){
            response.statut(500).json({
                message: "Ce n'est pas le métier qui est effacé mais le morceau de code pour lire le fichier qui a été éffacé",
                error: err,
            })
        }else{
            const crafteurExistant = JSON.parse(metier)
            const crafteurPerRank = crafteurExistant.classes.crafteur.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!crafteurPerRank){
                response.status(404).json({
                    message: "Kupo, aucun métier trouvé ici. Avec un autre idée kupo",
                    error: err,
                })
            }else{
                crafteurExistant.classes.crafteur = crafteurExistant.classes.crafteur.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(crafteurExistant), (writeErr)=>{
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
