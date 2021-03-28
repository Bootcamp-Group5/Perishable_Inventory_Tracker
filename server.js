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

setInterval(getAllUsers, 1000 * 60 * 60 * 24); // mili-seconds to 24H
// getAllUsers();

function getAllUsers() {
  User.findAll({
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
    .then(dbUserData => {
      const userArr = [];

      const users = dbUserData.map(user => user.get({ plain: true }));

      for (let i = 0; i < users.length; i++) {
        const currUser = users[i];

        if (!currUser.phone_number) {
          continue;
        };

        currUser.products = currUser.products.filter(product => {
          const diff = getDateDiff(product.expiration_date);
          
          switch(diff) {
            case 0:
              product.date_diff = 0;
              return true;
              
            case -1:
              product.date_diff = 1;
              return true;
              
            case -2:
              product.date_diff = 2;
              return true;

            case -3:
              product.date_diff = 3;
              return true;

            default:
              return false;
          };
        });

        if (!currUser.products.length) {
          continue;
        };

        // sort products based on their date_diff property (from lowest to highest);
        currUser.products.sort((a, b) => {
          const aDiff = a.date_diff
          const bDiff = b.date_diff

          if (aDiff > bDiff) {
            return 1;
          };

          if (aDiff < bDiff) {
            return -1;
          };

          return 0;

        });

        userArr.push(currUser);
      };

      userArr.forEach(sendMessage);
    });
};

function getDateDiff(date) {
  let expDate = moment(date, 'YYYY-MM-DD')
  let today = moment();

  let dateDiff = Math.floor(today.diff(expDate, 'days', true));
  console.log(expDate, dateDiff);

  return dateDiff;
};

function sendMessage(userObj) {

  const txt = generateText(userObj);
  const phoneNumber = userObj.phone_number;

  client.messages.create({
    to: phoneNumber,
    from: '+12892076557',
    body: txt
  });

  console.log(`msg sent to ${userObj.username}`);
};

function generateText(userObj) {
  let text = `Hey ${userObj.username}!\n`;

  userObj.products.forEach(product => {
    let datetxt = `in ${product.date_diff} days!`;

    if (product.date_diff === 0) {
      datetxt = 'today!'
    } else if (product.date_diff === 1) {
      datetxt = `tomorrow!`;
    };

    text += `${product.quantity} ${product.name} expires ${datetxt}\n`;
  });

  console.log(text);
  return text;
};


