const { Router } = require('express');
require('dotenv').config();
const { videogame } = require('../controllers')
const { Videogame, Genre } = require('../db.js');

const router = Router();

router.get('/:idVideogame', async (req, res, next) => {
    const { idVideogame } = req.params //ID received by params
    let data = await videogame(idVideogame)
    try {
        data ? res.send(data) : res.status(404).send('El id ingresado no coincide con un videojuego en particular')
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    const { name, image, genres, released, rating, platforms, description } = req.body
    try {
        let newVideogame = await Videogame.create({   //We create a new videogame with all the attributes that we want
            name,
            image,
            released,
            rating,
            platforms,
            description
        })
        const relation = await Genre.findAll({   //We find all the genres that we want
            where: {
                name: genres
            }
        })
        await newVideogame.addGenres(relation)   //We add the genres to the videogame
        res.json(newVideogame)
    } catch (e) {
        next(e)
    }
})

module.exports = router;