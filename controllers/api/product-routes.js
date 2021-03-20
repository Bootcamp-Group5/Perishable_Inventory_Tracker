const router = require('express').Router();
// Imported to model (tables) which are post and user tables.
const { Product, User } = require('../../models');
//To do calculations
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Product.findAll({
      // Query configuration
      order: [['created_at', 'DESC']], 
      attributes: [
        'id',
        'name',
        'image_string',
        'expiration_date',
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
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  });


  // select x,y from post where x or y
router.get('/:id', (req, res) => {
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
         // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
        res.json(dbProductData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});



  // Insert record
router.post('/',  withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Product.create({
      name: req.body.name,
      expiration_date: req.body.expiration_date,
      category: req.body.category,
      quantity: req.body.quantity,
      // insomina test will use  user_id: req.body.user_id
      // ussing session ID
      user_id: req.session.user_id
    })
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Update record
router.put('/:id', withAuth,  (req, res) => {
    Product.update(
        {
        quantity: req.body.quantity
        },
        {
        where: {
            id: req.params.id
        }
        }
    )
        .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});


// Delete Record
router.delete('/:id', withAuth,  (req, res) => {
    Product.destroy({
        where: {
        id: req.params.id
        }
    })
    .then(dbProductData => {
      if (!dbProductData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
      }
      res.json(dbProductData);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;