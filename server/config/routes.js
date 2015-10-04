'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.delete('/auth/session', session.logout);

  // Blog Routes
  var blogs = require('../controllers/blogs');
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.delete('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);

  // Checklist Routes
  var checklists = require('../controllers/checklists');
  app.get('/api/checklists', checklists.all);
  app.post('/api/checklists', auth.ensureAuthenticated, checklists.create);
  app.get('/api/checklists/:checklistId', checklists.show);
  app.put('/api/checklists/:checlistId', auth.ensureAuthenticated, auth.checklist.hasAuthorization, checklists.update);
  app.delete('/api/checklists/:checlistId', auth.ensureAuthenticated, auth.checklist.hasAuthorization, checklists.destroy);

  //Setting up the blogId param
  app.param('blogId', blogs.blog);
  app.param('checlistId', checklists.checklist)

  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    res.render('index.html');
  });

}