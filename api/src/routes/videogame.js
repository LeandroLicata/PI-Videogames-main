const { default: axios } = require("axios");
const Router = require("express");
const router = Router();
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    if (idVideogame.includes("-")) {
      const gameInDb = await Videogame.findOne({
        where: { id: idVideogame },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const {
        id,
        name,
        description,
        background_image,
        genres,
        rating,
        released,
        platforms,
        createdInDb,
      } = gameInDb;
      const gameInfo = {
        id,
        name,
        description,
        background_image,
        rating,
        released,
        platforms,
        createdInDb,
        genres: genres.map((g) => g.name),
      };
      return res.status(200).json(gameInfo);
    } else {
      const apiUrl = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const {
        id,
        name,
        description,
        background_image,
        genres,
        rating,
        released,
        platforms,
      } = apiUrl.data;
      const gameInfo = {
        id,
        name,
        description,
        background_image,
        rating,
        released,
        platforms: platforms.map((p) => p.name),
        genres: genres.map((g) => g.name),
      }
    }
  } catch (error) {
    res.status(404).send("Game not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      released,
      background_image,
      genres,
      createdInDb,
    } = req.body; //recibo los datos del juego a crear desde el body

    platforms = platforms.join(", "); //platforms llega como array por lo que debo convertirlo en string

    //creo el juego con los datos recolectados
    let createdVideogame = await Videogame.create({
      name,
      description,
      platforms,
      released,
      background_image,
      createdInDb,
    });
    //relaciono el juego creado con sus generos
    genres.forEach(async (g) => {
      let genre = await Genre.findOne({ where: { name: g } });
      await gameCreated.addGenre(genre);
    });
    res.send("Game created successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
