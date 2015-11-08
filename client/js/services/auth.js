'use strict';


app.factory('Auth', function Auth($location, $rootScope, Session, User, Itemizer, Team, $cookieStore) {
  $rootScope.currentUser = $cookieStore.get('user') || null;
  $cookieStore.remove('user');

  console.log("Initialize itemizer model");
<<<<<<< HEAD
  Itemizer.setUser($rootScope.currentUser);
  Itemizer.getTeams(); // preload list of teams

  // });
=======
  Itemizer.setUser($rootScope.createUser);
  Itemizer.getTeams(function(teams) {
    $rootScope.teams = teams;
  });
  
>>>>>>> origin/master
  // Team.query(function(teams) {
  //   $rootScope.teams = teams;
  //   $rootScope.team = _.find($rootScope.teams, function(team) {
  //     return team._id == $rootScope.currentUser.currentTeam;
  //   });
  // });

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
        Itemizer.setUser($rootScope.currentUser);
        Itemizer.getTeams();
        return cb();  
        // Itemizer.getTeams(function(teams) {
        //   $rootScope.teams = teams;
          
        // });
        
        // // Load teams for that user
        // Team.query(function(teams) {
        //   $rootScope.teams = teams;
        //   $rootScope.team = _.find($rootScope.teams, function(team) {
        //     return team._id == $rootScope.currentUser.currentTeam;
        //   });
        // });
        //return cb();
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