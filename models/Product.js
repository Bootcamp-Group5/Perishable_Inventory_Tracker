const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Product extends Model {}

Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_string: {
        type: DataTypes.STRING,
        allowNull: false
        // validate: {
        //   isURL: true
        // }
      },
      expiration_date: {
        type: DataTypes.STRING,
        allowNull: false
        // validate: {
        //   isURL: true
        // }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',//joing user Model on id column
          // association is still required at index.js of models
          key: 'id'
        }
      }
    },
    {
      sequelize,
      // what each of these metadata means?
      freezeTableName: true,
      underscored: true,
      modelName: 'product'
    }
  );

  module.exports = Product;