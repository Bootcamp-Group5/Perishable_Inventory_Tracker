const router = require('express').Router();
//const { User, Post, Vote, Comment } = require('../../models');
const { User, Product} = require('../../models');



// GET /api/users ALL
router.get('/',  (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: {exclude : ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1 by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'name',
          'image_string',
          'expiration_date',
          'quantity'
        ]
      },
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



  // POST /api/users - equal to insert
router.post('/', (req, res) => {
    // expects {username: 'test', password: 'test'}
    User.create({
      username: req.body.username,
      //email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
      
        res.json(dbUserData);
      });
    })

  });


router.post('/login', (req, res) => {
  //api/users/login
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => { // User retrived from the database
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      //req.body.password comes from the front end as json
      //that is compared with the password with the password generated for the user
      //at user creation as plaintext.

      
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
        
    
      //res.json({ user: dbUserData });
  
      // Verify user
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        console.log("log in status: " +  req.session.loggedIn)
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
  
    });  
  });


// update
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
      // Allows the set up beforeUpdate lifecycle "hook" functionality
      // @ Models User.js
      individualHooks: true,   
      where: {
          id: req.params.id
      }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user log logout
router.post('/logout', (req, res) => {
//console.log(req.session.loggedIn)
if (req.session.loggedIn) {
  req.session.destroy(() => {
    // Respond with json message use logged out
    console.log("User logged out");
    //return res.json({ user: dbUserData, message: 'You are now logged out' });
    //res.status(204).json({ message: 'No user found with this id' });
    res.status(204).end();
    // res.status(204)
    
  });
}
else {
  res.status(404).end();
  //document.location.replace('/');
  //res.status(404)
}
});


  module.exports = router;