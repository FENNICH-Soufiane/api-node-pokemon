const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
    .then(pokemon => {
      const message = `Le pokemon ${req.body.name} a bien été crée`
      res.json({message, data: pokemon})
    })
    .catch(error => {
      // j'ai pas trouver assez de document sur ce code 
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error })
      }
      // -------
      const message = 'Le pokemon n\' a pas pu etre récupérez. Réesayer dans quelques instants'
      res.status(500).json({message, data: error})
    })
  })    
}



// il sageit d'un point de terminaison