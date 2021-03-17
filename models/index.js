const User = require('./User');
const Product = require('./Product');


// JOIN ON, create associations, One to many relationships, etc
// create associations

// One to many relationships
User.hasMany(Product, {
    foreignKey: 'user_id'
  });


// One to one relationship
Product.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Product};