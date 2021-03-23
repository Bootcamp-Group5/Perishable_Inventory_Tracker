const router = require('express').Router();
const sequelize = require('../config/connection');
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');

// get all products for dashboard6
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
    'id',
    'name',
    'image_string',
    'expiration_date',
    'category',
    'quantity'
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ],
    order: [['created_at', 'DESC']]
    
  })
    .then(dbProductData => {
      const products = dbProductData.map(product => product.get({ plain: true }));
      res.render('dashboard', { products, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all posts for dashboard6
router.get('/full', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Product.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'name',
        'image_string',
        'expiration_date',
        'category',
        'quantity'
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbProductData => {
        const products = dbProductData.map(product => product.get({ plain: true }));
        res.render('dashboard-full', { products, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

router.get('/edit/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    attributes: [
        'id',
        'name',
        'image_string',
        'expiration_date',
        'category',
        'quantity'
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbProductData => {
      if (dbProductData) {
        const products = dbProductData.get({ plain: true });
        
        res.render('edit-product', {
        products,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// route to order by x or y
router.get('/orderBy/:sort', withAuth, (req, res) => {
  console.log('======================');
  const order = req.params.sort;
  Product.findAll({
    where: {
      user_id: req.session.user_id
    },
    // Query configuration
    order: [[order, 'ASC']], 
    attributes: [
      'id',
      'name',
      'image_string',
      'expiration_date',
      'category',
      'quantity'
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    
    // to return everything  include:[User]
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbProductData => {
    const products = dbProductData.map(product => product.get({ plain: true }));
    res.render('dashboard', { products, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
