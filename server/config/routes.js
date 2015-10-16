'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  app.post('/user/team', users.setTeam);

  // TODO: Add option to update username


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

  var checklists = require('../controllers/checklists');
  app.get('/api/checklists', checklists.all);
  app.post('/api/checklists', auth.ensureAuthenticated, checklists.create);
  app.get('/api/checklists/:checklistId', checklists.show);
  app.put('/api/checklists/:checklistId', auth.ensureAuthenticated, auth.checklist.hasAuthorization, checklists.update);
  app.delete('/api/checklists/:checklistId', auth.ensureAuthenticated, auth.checklist.hasAuthorization, checklists.destroy);

  var projects = require('../controllers/projects');
  app.get('/api/projects', projects.all);
  app.post('/api/projects', auth.ensureAuthenticated, projects.create);
  app.get('/api/projects/:projectId', projects.show);
  app.put('/api/projects/:projectId', auth.ensureAuthenticated, auth.project.hasAuthorization, projects.update);
  app.delete('/api/projects/:projectId', auth.ensureAuthenticated, auth.project.hasAuthorization, projects.destroy);

  var teams = require('../controllers/teams');
  app.get('/api/teams', teams.all);
  app.post('/api/teams', auth.ensureAuthenticated, teams.create);
  app.get('/api/teams/:teamId', teams.show);
  app.put('/api/teams/:teamId', auth.ensureAuthenticated, auth.team.hasAuthorization, teams.update);
  app.delete('/api/teams/:teamId', auth.ensureAuthenticated, auth.team.hasAuthorization, teams.destroy);

  var activities = require('../controllers/activities');
  app.get('/api/activities', activities.all);
  app.post('/api/activities', auth.ensureAuthenticated, activities.create);
  app.get('/api/activities/:activityId', activities.show);
  app.put('/api/activities/:activityId', auth.ensureAuthenticated, auth.activity.hasAuthorization, activities.update);
  app.delete('/api/activities/:activityId', auth.ensureAuthenticated, auth.activity.hasAuthorization, activities.destroy);

  var team_invites = require('../controllers/team_invites');
  app.get('/api/team_invites', team_invites.all);
  app.post('/api/team_invites', auth.ensureAuthenticated, team_invites.create);
  app.get('/api/team_invites/:inviteId', team_invites.show);
  app.put('/api/team_invites/:inviteId', auth.ensureAuthenticated, auth.activity.hasAuthorization, team_invites.update);
  app.delete('/api/team_invites/:inviteId', auth.ensureAuthenticated, auth.activity.hasAuthorization, team_invites.destroy);

  app.param('blogId', blogs.blog);
  app.param('checklistId', checklists.checklist)
  app.param('projectId', projects.load);
  app.param('teamId', teams.load);
  app.param('activityId', activities.load);
  app.param('inviteId', team_invites.load);

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