const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
//const { User } = require('../models');
const { Product, User} = require('../models');


router.get('/', withAuth,(req, res) => {
  // console log session information
  //console.log(req.session);
  Product.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'name',
      'image_string',
      'expiration_date',
      'quantity',
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
      // pass a single post object into the homepage template
      // note that we had res.json(dbPostData) now we use res.render
      // render is from handlebars engine
      // to avoid getting all of sequelize object, we need the plain rendering
      // get({ plain: true }) will get us the attributes that we defined.
     // console.log(dbPostData[0].get({ plain: true }));
      // We need full sequelize array
      const products = dbProductData.map(product => product.get({ plain: true }));
      //res.render('homepage', dbPostData[0].get({ plain: true }));
      res.render('homepage', { 
        products,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/homepage', withAuth,(req, res) => {
  // console log session information
  //console.log(req.session);
  Product.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'name',
      'image_string',
      'expiration_date',
      'quantity',
      
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbProductData => {
      // pass a single post object into the homepage template
      // note that we had res.json(dbPostData) now we use res.render
      // render is from handlebars engine
      // to avoid getting all of sequelize object, we need the plain rendering
      // get({ plain: true }) will get us the attributes that we defined.
     // console.log(dbPostData[0].get({ plain: true }));
      // We need full sequelize array
      const products = dbProductData.map(product => product.get({ plain: true }));
      //res.render('homepage', dbPostData[0].get({ plain: true }));
      res.render('homepage', { 
        products,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } else {
    res.render('login');
  }
  
});

router.get('/signUp', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } else {
    res.render('signUp');
  }
  
});

// logic for single-post handlebar
router.get('/product/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'image_string',
      'expiration_date',
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
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }

      // serialize the data be visible as an object
      const product = dbProductData.get({ plain: true });

      // pass data to template
      res.render('single-product', { 
        product,
        loggedIn: req.session.loggedIn
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;