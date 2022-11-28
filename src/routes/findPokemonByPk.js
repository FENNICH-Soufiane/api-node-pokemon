const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon =>  {
      if (pokemon === null) {
        const message = 'Le pokemon demandé n\' existe pas, reesayer un autre identifiant'
        return res.status(404).send({message})
      }
      const message = ' un pokemon a bien été trouvé'
      res.json({ message, data: pokemon })
    })
    .catch(error => {
      const message = 'Le pokemon n\' a pas pu etre récupérez. Réesayer dans quelques instants'
      res.status(500).json({message, data: error})
    })
  })
}