const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caracteres`
        return res.status(400).send({message})
      } 

      // ce code est similaire au code en dessous
      // return Pokemon.findAll({where: { name: name }})
      return Pokemon.findAndCountAll({
        where: {
          name: { // 'name' est al propieté du modele pokemon
            // [Op.eq]: name // 'name' est le critere de la recherche
            [Op.like]: `%${name}%`
          }
        },
        order: ['name'],
        limit: limit
      })
        .then(({ count, rows }) => {
          const message = `il y a ${count} pokemons qui correspondent au terme de recherche ${name}}`
          res.json({ message, data: rows })
        })
    }
    else {
      Pokemon.findAll({ order: ['name'] })
        .then(pokemons => {
          const message = 'la liste des pokemons a été bien recuperer'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = 'La liste despokemon n\'a pas pu etre renvoyer. Ressayer dans quelques instants'
          res.status(500).json({ message, data: error })
        })
    }
  })
}