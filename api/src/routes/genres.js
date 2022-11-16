const axios = require("axios");
const Router = require("express");
const { Genre } = require("../db");
const router = Router();
require("dotenv").config();
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    //compruebo si estan los generos en la DB, si están los retorno
    const genresInDb = await Genre.findAll();
    if (genresInDb.length) return res.status(200).json(genresInDb);
    //sino se los pido a la API
    const genresUrl = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = genresUrl.data.results; //genres es un array con los generos dentro como objetos
    //busco los generos dentro de la DB, si no están los creo
    genres.forEach((genre) => {
      Genre.findOrCreate({
        where: { name: genre.name },
      });
    });
    //retorno los nombres de los generos
    const genresShown = genres.map((genre) => {
      const { id, name } = genre;
      return {
        id,
        name,
      };
    });
    return res.status(200).json(genresShown);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
