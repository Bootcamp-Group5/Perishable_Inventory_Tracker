// *** Middlware router *** //
const router = require('express').Router();

// *** Homepage router with GET's *** //
const homeRoutes = require('./home-routes.js');

// *** Api router *** //
//const apiRoutes = require('./api');

// *** Dashboard router with GET's *** //
const dashboardRoutes = require('./dashboard-routes.js');




// routing paths
router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// 404 Not Found HTTP request was not found
router.use((req, res) => {
    res.status(404).end();
  });

// Export the middle router for usage @ router incoming 
// from server node.js express session
module.exports = router;