const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require('./videogame');
const videogamesRouter = require('./videogames');
const genresRouter = require('./genres');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
