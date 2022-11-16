const Router = require("express");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

router.get("/", async (req, res) => {
  //traigo los juegos creados desde la DB incluyendo el modelo Genre para relacionarlos
  let gamesInDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const searchedName = req.query.name;
  //si me llega un name por query voy a buscar los juegos cuyo nombre coincida en la API
  if (searchedName) {
    try {
      let apiUrl = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchedName}`
      );
      //compruebo si se encuentran juegos en la api por el nombre buscado a traves de la propiedad count
      if (!apiUrl.data.count)
        return res.status(404).send("videogame not found :(");
      const gamesInApi = apiUrl.data.results.map((game) => { //traigo los juegos de la API
        const { id, name, background_image, rating, genres } = game;
        return {
          id,
          name,
          background_image,
          rating,
          genres: genres.map((g) => g.name),
        };
      });
      const filteredGamesInDb = gamesInDb.filter((g) => //filtro los juegos de la DB
        g.name.toLowerCase().includes(searchedName.toLowerCase())
      );
      //concateno y retorno
      const gamesShown = [...filteredGamesInDb, ...gamesInApi.slice(0, 15)];
      return res.status(200).json(gamesShown);
    } catch (error) {
      return console.log(error);
    }
  } else {
    //si no hay query traigo todos los juegos
    try {
      let pages = 0;
      let gamesShown = [...gamesInDb];
      let apiUrl = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      while (pages < 5) { //uso la variable pages para limitar los juegos traidos de la API a 100
        pages++;
        const gamesInApi = apiUrl.data.results.map((game) => {
          const { id, name, background_image, rating, genres } = game;
          return {
            id,
            name,
            background_image,
            rating,
            genres: genres.map((g) => g.name),
          };
        });
        gamesShown = [...gamesShown, ...gamesInApi];
        apiUrl = await axios.get(apiUrl.data.next); //accedo a los siguientes juegos a traves de next
      }
      return res.status(200).json(gamesShown);
    } catch (error) {
      return console.log(error);
    }
  }
});

module.exports = router;
