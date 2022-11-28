const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom set déja pris'
        },
        validate: {
          notEmpty: {msg: 'le nom ne peut pas etre vide'},
          notNull: {msg: 'le nom est une propriete requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie .' },
          notNull: { msg: 'Les points de vie sont une proprieté requise.' },
          min: {
            args: [0],
            msg: 'Les points de vie doivent etre superieur ou egale à 0'
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent etre inférieur ou egale à 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégats .' },
          notNull: { msg: 'Les points de dégats sont une proprieté requise.' },
          min: {
            args: [0],
            msg: 'Les points de dégats doivent etre superieur ou egale à 0'
          },
          max: {
            args: [99],
            msg: 'Les points de dégats doivent etre inférieur ou egale à 99'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image'},
          notNull: { msg: 'L\'image est propiete requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        // ,
        // get() {
        //   return this.getDataValue('types').split(',')
        // }
        // ,
        // set(types) {
        //   this.setDataValue('types', types.join())
        // }
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokemon doit au moins avoir un type')
              // Un pokemon ne peux pas avoir plus de trois types
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    }
    )
  }