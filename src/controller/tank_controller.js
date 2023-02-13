//Constante pour la lecture des fichier (fs)
const fs = require('fs');

//Méthode CRUD pour le tableau Tank

//Creation
//Création d'une nouvelle entrée pour un tank
exports.createTank = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.status(500).json({
                message: "La puissance du tank te laisse tomber. Retourne lire ton code", 
                error: err,
            })
        }else{
            const tankExistant = JSON.parse(tank);
            const tankExistantId = tankExistant.classes.tank.map(
                (obj)=>obj.id
                )
            const idMax = Math.max(...tankExistantId)
            tankExistant.classes.tank.push({
                "id" : idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(tankExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message: "Lecture des sorts de tank. Va falloir réviser",
                        error: err,
                    })
                } else {
                    response.status(200).json({
                        message: "La puissance de ton nouveau tank t'accompagne dans tes aventures"
                    })
                }
            })
        }
    })
}

//Read
//Read tous les tanks du tableau
exports.readTank = (request, response)=> {
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.status(500).json({
                message: "T'as pas mis la stance donc retourne voir ton code sinon pas d'aggro",
                error: err,
            })
        }else{
            response.status(200).json(JSON.parse(tank).classes.tank)
        };
    })
}

//Read 
//lecture d'un job de tank de la liste par son id
exports.readTankById = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.status(500).json({
                response: "Ragequit le code. T'as une erreur de lecture",
                error: err,
            })
        } else {
            const tankExistant=JSON.parse(tank).classes.tank.find(
                (obj)=> obj.id === parseInt(request.params.id)
            );
            if(tankExistant){
                response.status(200).json(tankExistant)
            }else {
                response.status(404).json({
                    message:"Ton tank se trouve dans un autre endroit",
                    error: err,
                });
            }
        }
    });
}

//Read
//Lecture d'une entrée tank par son nom
exports.readTankByName =(request, response)=>{
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.status(500).json({
                message: "Le Tank que vous cherchez est dans un autre château",
                error: err,
            })
        }else{
            const tankExistant=JSON.parse(tank).classes.tank.find(
                (obj)=>obj.classe === request.params.classe
            );
            if(tankExistant){
                response.status(200).json(tankExistant)
            }else{
                response.status(404).json({
                    message: "Tank Not found!",
                    error: err,
                })
            }
        }
    })
}

//Update
//modifier les infos d'un Tank existant par son Id
exports.updateTank = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.status(500).json({
                message:"Tank perdu dans la lecture",
                error: err,
            })
        }else{
            const tankExistant = JSON.parse(tank);
            const tankPerRank = tankExistant.classes.tank.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!tankPerRank){
                response.status(404).json({
                    message : "Le tank est perdue. Retrouvez-le",
                    error: err,
                })
            } else {
                tankPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(tankExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "il manque une entrée mais je suis trop ko pour m'en occuper",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Le tank a été mis à jour.",
                        })
                    }
                })
            }
        }
    })
}

// Delete
//supprime une entrée de tank 
exports.deleteTank = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, tank)=>{
        if(err){
            response.statut(500).json({
                message: "Le tank a disparu.",
                error: err,
            })
        }else{
            const tankExistant = JSON.parse(tank)
            const tankPerRank = tankExistant.classes.tank.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!tankPerRank){
                response.status(404).json({
                    message: "Tank Not found et j'ai plus d'idée. Marrante",
                    error: err,
                })
            }else{
                tankExistant.classes.tank = tankExistant.classes.tank.filter(
                    (obj)=> obj.id !=parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(tankExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "Rendez-vous en page 23 ou recommencez-vous.",
                            error: err,
                        })
                    } else{
                        response.status(200).json({
                            message: "La suppression a eu lieu. Tu ne veux plus jouer Tank"
                        })
                    }      
                })
            }
        }
    })
}
