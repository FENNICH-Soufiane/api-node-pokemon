const express = require('express')
const favicon = require('serve-favicon')
var bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();

// convertir les donné en json
// app.use(express.json())

app.use(favicon(__dirname + '/favicon.ico'))
  .use(bodyParser.json())

sequelize.initDb()

app.get('/ok', (req, res) => {
  res.json('Hello, Heroku ! 👋')
})

// Ici, nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message = 'Impossible de trouver la ressource demandé ! Vous pouvez essayer une autre URL.'
  res.status(404).json({ message })
})

var port = process.env.PORT || 3001
// app.listen(port, () => console.log(`our app is runing on : http://localhost:${port}`));
app.listen(port, () => console.log("server started on port " + port));


