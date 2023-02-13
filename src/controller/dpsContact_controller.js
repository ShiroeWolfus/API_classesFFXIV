//Constante pour la lecture des fichiers (fs)
const fs = require('fs');

//Utilisation de la méthode CRUD sur la liste des DPS Corps à Corps

//Création
// Insertion d'un nouveau job en fin de texte
exports.createDpsCac = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Pour taper au corps à corps tape un autre id",
                error: err,
            })
        }else{
            const jobDpsExistant = JSON.parse(job);
            const jobDpsExistantId=jobDpsExistant.classes.dpsContact.map(
                (obj)=>obj.id
            )
            const idMax= Math.max(...jobDpsExistantId)
            jobDpsExistant.classes.dpsContact.push({
                "id": idMax+1,
                "classe": request.body.classe
            })
            fs.writeFile("./src/model/job.json", JSON.stringify(jobDpsExistant), (writeErr)=>{
                if(writeErr){
                    response.status(500).json({
                        message:"Erreur de lecture du dps meter",
                        error: err,
                    })
                }else {
                    response.status(200).json({
                        message: "Hit combo Perfect. Ajout réussi !"
                    })
                }
            })
        }

    })
}

//Read
//Affichage complet du tableau
exports.readDpsCac = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Erreur de lecture. Allez  en page 42",
                error: err,
            });
        }else{
            response.status(200).json(JSON.parse(job).classes.dpsContact)
        }
    });
}

//Read2
//Affichage d'une entrée de la liste par son ID
exports.readDpsCacById=(request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "T'as pas tapé le bon mob. Reformule l'ID",
                error: err,
            })
        }else{
            const jobDpsExistant=JSON.parse(job).classes.dpsContact.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(jobDpsExistant){
                response.status(200).json(jobDpsExistant)
            }else{
                response.status(404).json({
                    message: "Job not Found please send avaible request",
                    error: err,
                })
            }
        }
    })
}

//Read3
//Affichage d'une entrée du tableau par le nom
exports.readDpsCacByName=(request, response)=>{
    fs.readFile("./src/model/job.json", (err,job)=>{
        if(err){
            response.status(500).json({
                message: "Nope! Y a rien à voir, circulez",
                error: err,
            })
        }else{
            const jobDpsExistant = JSON.parse(job).classes.dpsContact.find(
                (obj)=>obj.classe === request.params.classe
            )
            if(jobDpsExistant){
                response.status(200).json(jobDpsExistant)
            }else{
                response.status(404).json({
                    message : "Nothing to find here. But thanks to visits",
                    error: err,
                })
            }
        }
    })
}

//Update
//Modification d'une entrée du tableau par l'Id
exports.updateDpsCac=(request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message: "Wrong script. C'est bien comme position script ça ?",
                error: err,
            })
        }else{
            const jobDpsExistant = JSON.parse(job);
            const dpsPerRank = jobDpsExistant.classes.dpsContact.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!dpsPerRank){
                response.status(404).json({
                    message:"Ne pas avancer, ne pas reculer mais chercher le bon endroit",
                    error: err,
                })
            }else{
                dpsPerRank.classe = request.body.classe;
                fs.writeFile("./src/model/job.json", JSON.stringify(jobDpsExistant), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message:"L'inspi, où est l'inspi. Comme l'id que tu cherches",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message : "Update sauvegardée. Veuillez ne pas retirer la memory card!",
                        })
                     }
                 })
            }
        }
    })
}

//Delete
//Effacer une entrée spécifique
exports.deleteDpsCac = (request, response)=>{
    fs.readFile("./src/model/job.json", (err, job)=>{
        if(err){
            response.status(500).json({
                message:"Où est l'id ? A côté de Charlie. Mais où est Charlie ?"
            })
        }else{
            const jobDpsExistant = JSON.parse(metier)
            const dpsPerRank = jobDpsExistant.classes.dpsContact.find(
                (obj)=> obj.id === parseInt(request.params.id)
            )
            if(!dpsPerRank){
                response.status(404).json({
                    message : "Si tu vois ce message c'est grave, très grave!",
                    error: err,
                })
            }else {
                jobDpsExistant.classes.dpsContact = jobDpsExistant.classes.dpsContact.filtrer(
                    (obj)=> obj.id != parseInt(request.params.id))
                fs.writeFile("./src/model/job.json", JSON.stringify(job), (writeErr)=>{
                    if(writeErr){
                        response.status(500).json({
                            message: "J'ai pas d'inspi mais là y a une erreur de lecture",
                            error: err,
                        })
                    }else{
                        response.status(200).json({
                            message:"L'effacement est effacé. Inception"
                        })
                    }
                })   
            }
        }
    })
}
