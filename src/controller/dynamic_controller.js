//Constante pour la lecture des fichiers (fs)
const fs = require('fs');

//POST
//Création de données 
exports.createData = (request, response) => {
    fs.readFile("./src/model/job.json", (err, role) => {
        if (err) {
            response.status(500).json({
                message: "Le sort n'a pas marché. Le lancement a échoué!",
                error: err,
            })
        } else {
            const jobExistant = JSON.parse(role);
            const jobExistantId = jobExistant.classes[request.params.categorie].map(
                (obj)=>obj.id
            )
            const idMax = Math.max(...jobExistantId)
            jobExistant.classes[request.params.categorie].push({
                "id": idMax+1,
                "classe": request.body.classe})
            fs.writeFile("./src/model/job.json", JSON.stringify(jobExistant), (writeErr) => {
                if (writeErr){
                    response.status(500).json({
                        message: "La marque de ton sort a échoué. L'écriture ne s'est pas faite",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "Bien joué. L'écriture est dans ton grimoire.",
                    });
                }
            });
        }
    });
}

//GET
//Méthode pour afficher la base de données
//GET ARRAY
exports.readData = (request, response)=>{
    fs.readFile('./src/model/job.json', (err, role)=>{
        if(err){
            response.status(500).json({
                message:"Un problème est survenue dans la lecture du flux éthéré",
                error : err
            })
        }else {
            response.status(200).json(JSON.parse(role).classes[request.params.classes])
        }
    });
}
// GET JSON
exports.readAllData = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, role)=>{
        if(err){
            response.status(500).json({
                message: "Le menu de toutes les classes n'apparaît pas. Un problème est survenue!",
                error: err,
            });
        }else{
            response.status(200).json(JSON.parse(role))
        }
    });
}
//GET BY ID
exports.readDataById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, role)=>{
        if(err){
            response.status(500).json({
                response: "Ce n'est pas la bonne façon de lire le fichier, t'as fait une erreur. Vas lire ton code",
                error: err,
            });
        }else{
            const jobExistant=JSON.parse(role).classes[request.params.categorie].find(
                (obj)=>obj.id === parseInt(request.params.id)
            );
            if(jobExistant){
                response.status(200).json(jobExistant)
            }else {
                response.status(404).json({
                    message: "l'id entré n'existe pas. Cherche un autre métier.",
                    error: err,
                });
            }
        }
    });
}

//GET BY Name
exports.readDataByName = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, role)=>{
        if(err){
            response.status(500).json({
                message: "Ce n'est pas la bonne façon de lire le fichier, t'as fait une erreur. Vas lire ton code",
                error: err,
            });
        }else{
            const jobExistant=JSON.parse(role).classes[request.params.categorie].find(
                (obj)=>obj.classe === request.params.classe
            );
            if(jobExistant){
                response.status(200).json(jobExistant)
            }else {
                response.status(404).json({
                    message: "l'id entré n'existe pas. Cherche un autre métier.",
                    error: err,
                });
            }
        }
    });
}
//PUT
exports.updateData = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, role)=>{
        if(err){
            response.statut(500).json({
                message: "Tu t'es trompé de page ? Une erreur dans la matrice a été détectée",
                error: err,
            })
        } else{
            const jobExistant =JSON.parse(role);
            const jobPerRank = jobExistant.classes[request.params.categorie].find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(!jobPerRank){
                response.status(404).json({
                    message: 'Désolé Mario but your Id is an another castle!',
                    error: err,
                });
            }else {
                jobPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(jobExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "L'avenir est sombre mais ton code l'est encore plus !",
                            error: err, 
                        })
                    }else{
                        response.status(200).json({
                            message : "La manipulation éthéréenne a fonctionnée. Mise à jour complète",
                        })
                    }
                })
            }
        }
    })
}

//DELETE
exports.deleteData = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, role)=>{
        if(err){
            response.status(500).json({
                message: "Vous avez été emporté dans le flot de l'erreur de lecture. Sombrez!",
                error: err,
            });
        }else{
            const jobExistant = JSON.parse(role)
            const jobPerRank = jobExistant.classes[request.params.categorie].find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!jobPerRank){
                response.status(404).json({
                    message : "Dead Island. Absence de vie ici !",
                    error: err,
                })
            } else {
                jobExistant.classes[request.params.categorie] = jobExistant.classes[request.params.categorie].filter(
                    (obj)=> obj.id != parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(jobExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Game Over ! Continue : 500 ! Press start",
                            error : err
                        })
                    }else {
                        response.status(200).json({
                            message:"L'abîme aspire et ne laisse rien. L'éffacement a eu lieu ",
                        })
                    }
                })
            }
        }
    })
}