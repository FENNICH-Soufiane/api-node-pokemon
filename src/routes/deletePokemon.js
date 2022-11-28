const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
        const message ='Le pokemon demande n\'existe pas. Réesayer avec un autre identifiant'
        return res.status(404).json({message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: {id: pokemon.id}
      })
      .then(_ => {
        const message = `Le pokemon avec l'identifiant n° ${pokemonDeleted.id} a bien été supprimer`
        res.json({message, data:pokemonDeleted})
      })
    })
    .catch(error => {
      const message = 'Le pokemon n\' a pas pu etre supprimé. Réessayer dans quelque instants'
      res.status(500).json({message, data: error})
    })
  })
}

