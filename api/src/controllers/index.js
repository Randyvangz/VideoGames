const { default: axios } = require('axios');
const { Videogame, Genre } = require('../db.js')

//Get 100 videogames from API
const infoApi = async () => {
    let url = `https://api.rawg.io/api/games?key=f9ee51ed795746a1970f93399a92c096`
    let videogames = []
    try {
        for (let i = 0; i < 5; i++) {    //5 times because it's an array of 20 videogames and we need 100
            const result = await axios.get(url)     //request to API. This has a .data property with an array of videogames and a .next property with the next page
            result.data.results.map(e => {      //map videogames from array of videogames
                videogames.push({            //push videogames in videogames array
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    rating: e.rating,
                    platforms: e.platforms?.map(el => el.platform.name),
                    genres: e.genres?.map(el => el.name)
                })
            })
            //this is the next page of the API to get the next 20 videogames
            url = result.data.next
        }
        return videogames
    } catch (e) {
        console.log(e)
    }
};

//Get videogames from DB
const infoDB = async () => {
    try {
        return await Videogame.findAll({    //SELECT * FROM Videogame
            include: [{
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
    } catch (e) {
        console.error(e)
    }
}

//Get total videogames from API and DB
const infoTotal = async () => {
    //to join the two requests, save the execution of the functions
    const apiData = await infoApi();
    const dbData = await infoDB();
    //now join the two arrays
    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
}

//Request to API. GET https://api.rawg.io/api/games?search={name}
const nameApi = async (name) => {
    const infoSearch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=f9ee51ed795746a1970f93399a92c096`)
    //console.log(infoSearch.data.results). This is the array of videogames that match the name searched. We need to map it to get the videogames that match the name searched and return it as an array of videogames.
    try {
        const vgSearch = await infoSearch.data.results.map(vg => {
            return {
                id: vg.id,
                name: vg.name,
                image: vg.background_image,
                rating: vg.rating,
                platforms: vg.platforms?.map(el => el.platform.name),
                genres: vg.genres?.map(el => el.name)
            }
        })
        return vgSearch;
    }
    catch (e) {
        console.error(e)
    }
}

//Request to API. Get https://api.rawg.io/api/games/{id}
const idApi = async (id) => {
    try {
        const rtaApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=f9ee51ed795746a1970f93399a92c096`)
        if (rtaApi) {
            const vgId = await rtaApi.data
            const info = {
                id: vgId.id,
                name: vgId.name,
                image: vgId.background_image,
                genre: vgId.genres?.map(el => el.name),
                description: vgId.description,
                released: vgId.released,
                rating: vgId.rating,
                platforms: vgId.platforms?.map(el => el.platform.name),
            }
            return info
        } else {
            return ("No se encontró el juego con ese ID")
        }
    } catch (e) {
        console.error(e)
    }
}

//Request to DB
const idDb = async (id) => {
    try {
        return await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })        
    } catch(e) {
        console.error(e)
    }
}

//Get videogames ID from API and DB
const videogame = async (id) => {
    const id_Db = id.includes("-")
    if (id_Db) {
        const vgIdDb = await idDb(id)
        return vgIdDb
    } else {
        const vgIdApi = await idApi(id)
        return vgIdApi
    }
} 

module.exports = {
    infoApi,
    infoDB,
    infoTotal,
    nameApi,
    videogame,
}