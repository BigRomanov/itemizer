module.exports = function(app) {

  // Beta registrations
  var betas = require('../controllers/beta_registrations');
  app.post('/beta', betas.create);
  
  app.get('/*', function(req, res) {
    res.render('landing.html');
  });
}