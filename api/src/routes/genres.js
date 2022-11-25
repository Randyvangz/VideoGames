const { default: axios } = require('axios');
const { Router } = require('express');
const { Genre } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await axios.get(`https://api.rawg.io/api/genres?key=f9ee51ed795746a1970f93399a92c096`)
        const genresApi = await result.data.results.map(g => g.name) //this genres all genres from api

        genresApi.map(e => Genre.findOrCreate({ //save genres from api in db
            where: { name: e } 
        }))

        const allGenres = await Genre.findAll() //list all genres from db
        res.json(allGenres)

    } catch (e) {
        next(e)
    }

})

module.exports = router;