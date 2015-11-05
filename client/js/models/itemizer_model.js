'use strict';

app.service('Itemizer', ['Team', 'Project', 'Task', '$log', function(Team, Project, Task, $log) {
  
  this.user = null;
	this.teams = null;
	this.projects = {};

	this.setUser = function(user) {
    console.log("Setting user", user);
    if (user) {
      this.user = user;
      this.currentTeamId = user.currentTeam;  
    }
	}
	
  this.getTeams = function(callback) {
    $log.log("Itemizer::getTeams");
  	var self = this;
  	if (self.teams) {
      $log.log("Itemizer::getTeams - cache", self.teams);
      if (callback) {
  		  callback(self.teams);
      }
    }
  	else {
      $log.log("Itemizer::getTeams - live 1");
	  	Team.query(function(teams) {
        $log.log("Itemizer::getTeams", teams);
	      self.teams = teams;
	      self.currentTeamId = self.user.currentTeam;

	      console.log("Loaded teams:", teams);

	      self.teamMap = _.object(_.map(teams, function(item) {
	   			return [item._id, item]
				}));

        if (callback)
				  callback(self.teams);
	    });
	  }
  }

  this.getCurrentTeam = function(callback) {
    $log.log("Itemizer::getCurrentTeam");
    var self = this;
    if (self.teams) {
      var team = self.teamMap[self.currentTeamId];
      $log.log("Itemizer::getCurrentTeam - cache", team);
      callback(team);
    }
    else {
      $log.log("Itemizer::getCurrentTeam 2");
      self.getTeams(function(teams) {
        var team = self.teamMap[self.currentTeamId];
        $log.log("Itemizer::getCurrentTeam - live", team);
        callback(team);
      })
    }
  }

  this.getProjects = function(teamId, callback) {
  	var self = this;
  	if (teamId in self.projects)
  		callback(self.projects[teamId]);
  	else {
  		Project.query({ teamId: teamId }, function(projects) {
          $log.log("Loading projects", projects);
          self.projects[teamId] = projects;
          callback(projects);
        });
  	}
  };
}]);
