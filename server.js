// *** Start of Import Express library require *** ///
const express = require('express');
// *** End of Import Express library require *** //

// *** Start of Import Path libraries *** //
const path = require('path');
// *** End of Import Path libraries *** //

// *** Start of routes middleware for controller routes *** //
const routes = require('./controllers');
// *** End of routes middleware for controller routes *** //

// *** Start of Import Sequelize library require *** //
const sequelize = require('./config/connection');
// *** End of Import Sequelize library require *** //

// Helper functions
const helpers = require('./utils/helpers'); //

// *** Start of Import Handlebars library require *** // 
// Used to add back the concept of layout, partials and others.
const exphbs = require('express-handlebars');
//const hbs = exphbs.create({ helpers }); 
const hbs = exphbs.create({helpers}); 
// *** End of Import Handlebars library require *** //


// *** Start of express session store *** /
/* Description of express-session
The express-session package is an Express.js middleware 
that uses sessions, a mechanism that helps applications
to determine whether multiple requests came from the same
client. Developers may assign every user a unique session 
so that their application can store the user state, and thus
authenticate users."
 */
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
/* Description of connect session sequelize
"The connect-session-sequelize package  provides applications with a
scalable store for sessions. The express-session package’s default
server-side session storage, MemoryStore, is purposely not designed
for a production environment, will leak memory under most conditions,
doesn’t scale past a single process, and is only meant for debugging
and developing. The connect-session-sequelize package resolves these
issues and is compatible with the Sequelize ORM."
*/
// *** End of express session store *** //

// *** Initiate Express *** //
const app = express();
// Port start node js with express listening port
const PORT = process.env.PORT || 3001;

// *** Start of init express session cookies pass ***
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
// *** End of init express session cookies pass ***


// express. use express sessions which is connected to our database.
app.use(session(sess));

// handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express sessions to handle fetch as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express usage of public path which will have access to all js scriptst here
app.use(express.static(path.join(__dirname, 'public')));


// turn on express routes
app.use(routes);


//app.listen(PORT, () => console.log('Now listening'));

// User sequelize to create models if any and then initalize listenting express node.js
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });



var moment = require('moment'); // require
// *** Start of TWILIO text messaging service ***//
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio') (accountSid, authToken)

  const { Product, User} = require('./models');
  let productNameArrray = []
  let productQuantityArrray = []
  let userName = ''
  let phoneNumber = ''

    //console.log(req.session);
    User.findAll({
      //username
      //phonenumber
      attributes: { exclude: ['password'] },
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
      .then(dbProductData => {
        // pass a single post object into the homepage template
        // note that we had res.json(dbPostData) now we use res.render
        // render is from handlebars engine
        // to avoid getting all of sequelize object, we need the plain rendering
        // get({ plain: true }) will get us the attributes that we defined.
       // console.log(dbPostData[0].get({ plain: true }));
        // We need full sequelize array
        const users = dbProductData.map(product => product.get({ plain: true }));
        
        dateStatus(users);
        
        //res.render('homepage', dbPostData[0].get({ plain: true }));
        // res.render('homepage', { 
        //   products,
        //   loggedIn: req.session.loggedIn
        //  });

        //expiration_date: '2021-03-29'

    
  
        function sendTextMessage (userDeets, usersProducts,textStatus) {
                  //  console.log(userDeets);
                  //  console.log(usersProducts);
          
  
          // let userName = users.username
          // let phone_number = users.phone_number
          // let productName =  users.product.name
          // let productQuantity = users.product.quantity
           
           productNameArrray.push(`${usersProducts.name}`)
           productQuantityArrray.push(`${usersProducts.quantity}`)
          //  productNameArrray.join('')
          //  productQuantityArrray.join('')
           userName = userDeets.username
           phoneNumber = userDeets.phone_number
         
          //  console.log(`
          //  Product      | Quantity
          //  ${productName} | ${productQuantity}`)
  
          // for (i=0; i < users.products.length; i++) {
            
          
          // productNameArrray.push(users.product[i].name)
          
          // productQuantityArrray.push(users.product[i].quantity)
  
          // }
  
          // console.log(productNameArrray)
          // console.log(productQuantityArrray)
  
  
          // let productNameArrray = []
          // productNameArrray.push(users.product.name)
          // let productQuantityArrray = []
          // productQuantityArrray.push(users.product.quantity)
  
          // console.log(productNameArrray)
          // console.log(productQuantityArrray)
          
          // console.log("function started")
          // console.log(typeof(phone_number))
          // console.log(phone_number);
          // console.log(userName )
          // console.log(productName)
          // console.log(productQuantity)
  

        
         }


        function dateStatus(users) {
          
            console.log(users.length)

            for (i=0; i < users.length; i++) {
              for (let j = 0; j < users[i].products.length; j++) {
                          
                let expDate = moment(users[i].products[j].expiration_date, 'YYYY-MM-DD')
                let today = moment();
                let dateDiff = today.diff(expDate, 'days');
                let textStatus =""
                if (dateDiff >= 0) {
                 console.log("Danger Due Now")
                 textStatus = "expiring today"
                 sendTextMessage(users[i], users[i].products[j] , textStatus);
              } else if (dateDiff >= -3) {    
                console.log("Warning 3 days")
                sendTextMessage(users[i], users[i].products[j] , textStatus);
              } else {
                console.log("Ok or note expiring 3day +")
              };
                //console.log(products[i].expiration_date)
                //console.log(expDate)

              }

            }

            // console.log(productNameArrray.join(' '))
            // console.log(productQuantityArrray.join(' '))
            client.messages.create({
              to: phoneNumber,
              from: '+12892076557',
              body: `
Hey ${userName},
Items that require your attention.
Product/Quantity 
${productNameArrray.join(' ')} / ${productQuantityArrray.join(' ')}

`
});
      }



      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

