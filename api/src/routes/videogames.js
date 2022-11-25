const { Router } = require('express');
require('dotenv').config();
const { infoTotal, infoApi, nameApi, infoDB } = require('../controllers')

const router = Router();

//Find videogames by name
router.get('/', async (req, res, next) => {
    const { name } = req.query; //Name received by query
    let allVideogames = await infoTotal()
    if (name) {
        try {
            const foundGamesAPI = await nameApi(name)   //We find all the videogames that match the name
            const gamesByNameDB = await infoDB()    //We find all the videogames names in the DB
            let foundGamesDB = gamesByNameDB.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))  //We filter the videogames names in the DB that match the name
            let allResults = foundGamesDB.concat(foundGamesAPI) //We concat the videogames names in the DB with the videogames names from the API
            allResults.length ? res.status(200).send(allResults.slice(0, 15)) : res.status(400).send('No se encuentra un videojuego que contenga ese nombre')    //We send the videogames names that match the name if there are any
        } catch (err) {
            next(err)
        }
    }
    else {
        res.send(allVideogames)
        return
    }
})

//Find videogames by platform
router.get('/platforms', async (req, res, next) => {
    try {
        const all = await infoApi();
        const allPlatforms = [];
        all.map(e => e.platforms.map(p => { //We find all the platforms in the videogames
            if (!allPlatforms.includes(p)) {
                allPlatforms.push(p)    //We add the platforms that are not in the array
            }
        }))

        allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send('Error')    //We send the platforms if there are any           
    } catch (e) {
        next(e)
    }
})

module.exports = router;