'use strict';


app.factory('Auth', function Auth($location, $rootScope, Session, User, ProjectManager, Team, $cookieStore) {
  $rootScope.currentUser = $cookieStore.get('user') || null;
  $cookieStore.remove('user');

  if ($rootScope.currentUser)
  {
    console.log("Initialize itemizer model, user from cookie:", $rootScope.createUser);
    ProjectManager.setUser($rootScope.currentUser);
    ProjectManager.getTeams(function(teams) {
      $rootScope.teams = teams;
    });  
  }

  return {

    login: function(provider, user, callback) {
      var cb = callback || angular.noop;
      Session.save({
        provider: provider,
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe
      }, function(user) {
        $rootScope.currentUser = user;

        console.log("Initialize itemizer model");
        ProjectManager.setUser($rootScope.currentUser);
        ProjectManager.getTeams();
        return cb();  
      }, function(err) {
        return cb(err.data);
      });
    },

    logout: function(callback) {
      var cb = callback || angular.noop;
      Session.delete(function(res) {
          $rootScope.currentUser = null;
          return cb();
        },
        function(err) {
          return cb(err.data);
        });
    },

    createUser: function(userinfo, callback) {
      var cb = callback || angular.noop;
      User.save(userinfo,
        function(user) {
          $rootScope.currentUser = user;
          return cb();
        },
        function(err) {
          return cb(err.data);
        });
    },

    currentUser: function() {
      Session.get(function(user) {
        console.log("Current user:", user);
        $rootScope.currentUser = user;
      });
    },

    changePassword: function(email, oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;
      User.update({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        console.log('password changed');
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    },

    removeUser: function(email, password, callback) {
      var cb = callback || angular.noop;
      User.delete({
        email: email,
        password: password
      }, function(user) {
        console.log(user + 'removed');
        return cb();
      }, function(err) {
        return cb(err.data);
      });
    }
  };
})