//Constante pour la lecture des fichier (fs)
const fs = require('fs');

//Méthode CRUD pour le tableau healer

//Creation
//Création d'un nouveau fichier pour les soigneurs
exports.createHealer = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.status(500).json({
                message: "On ne sait pas qui tu soignes mais tu as mal lu l'étiquette de soins", 
                error: err,
            })
        }else{
            const healerExistant = JSON.parse(soigneur);
            const healerExistantId = healerExistant.classes.healer.map(
                (obj)=>obj.id
                )
            const idMax = Math.max(...healerExistantId)
            healerExistant.classes.healer.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(healerExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Epic fail! Va falloir revoir ton code ou ta rotation",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "A new soigneur is coming"
                    })
                }
            })
        }
    })
}

//Read
//Read tous les métiers du tableau des healer 
exports.readHealer = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.status(500).json({
                message: "Le patient n'a pas survécu. Erreur de lecture sur la fiche de soins",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(soigneur).classes.healer)
        };
    })
}

//Read 
//lecture d'un soigneur de la liste par son id
exports.readHealerById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.status(500).json({
                response: "Une erreur dans la lecture des sorts. On ne trouve personne pour soigner les dégâts reçus",
                error: err,
            })
        } else {
            const healerExistant=JSON.parse(soigneur).classes.healer.find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(healerExistant){
                response.status(200).json(healerExistant)
            }else {
                response.status(404).json({
                    message:"Pas le bon soigneur. En tout cas sur cette base de donnée",
                    error: err,
                });
            }
        }
    });
}

//Read
//Lecture d'un métier de soins par son nom
exports.readHealerByName =(request, response)=>{
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.status(500).json({
                message: "C'était bien un pansement mais erreur de lecture dans son utilisation",
                error: err,
            })
        }else{
            const healerExistant=JSON.parse(soigneur).classes.healer.find(
                (obj)=>obj.classe === request.params.classe
            );
            if(healerExistant){
                response.status(200).json(healerExistant)
            }else{
                response.status(404).json({
                    message: "Si tu soignes aussi bien que tu cherches ton healer on est mal.",
                    error: err,
                })
            }
        }
    })
}

//Update
//modifier les infos d'un métier de soins existant par son Id
exports.updateHealer = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.status(500).json({
                message:"L'énergie vitale est compromise. Lecture endommagée ",
                error: err,
            })
        }else{
            const healerExistant = JSON.parse(soigneur);
            const healerPerRank = healerExistant.classes.healer.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!healerPerRank){
                response.status(404).json({
                    message : "Presque mais là t'as utlisé de l'homéopathie. Donc ça sert à rien",
                    error: err,
                })
            } else {
                healerPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(healerExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Pas de soins pas de chocolat. Fallait relire ton code pour éviter l'erreur de lecture",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Ton patient va mieux depuis que tu as mis à jour tes capacités",
                        })
                    }
                })
            }
        }
    })
}

// Delete
//supprime une entrée dans le tableau des healer 
exports.deleteHealer = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, soigneur)=>{
        if(err){
            response.statut(500).json({
                message: "Ce n'est pas le métier qui est effacé mais le morceau de code pour lire le fichier qui a été éffacé",
                error: err,
            })
        }else{
            const healerExistant = JSON.parse(soigneur)
            const healerPerRank = healerExistant.classes.healer.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!healerPerRank){
                response.status(404).json({
                    message: "Ci-gît le healer mais pas celui que tu cherches",
                    error: err,
                })
            }else{
                healerExistant.classes.healer = healerExistant.classes.healer.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(healerExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "erreur de lecture du fichier. Rendez-vous à l'infirmerie",
                            error: err,
                        })
                    } else{
                        response.status(200).json({
                            message: "Le soigneur a été pris par la Faucheuse. Une minute de silence pour sa disparition"
                        })
                    }      
                })
            }
        }
    })
}
