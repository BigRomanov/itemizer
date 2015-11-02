'use strict';

app.service('Itemizer', ['Team', 'Project', 'Task', '$log', function(Team, Project, Task, $log) {
  
  this.user = null;
	this.teams = null;
	this.projects = {};

	this.setUser = function(user) {
		this.user = user;
		this.currentTeamId = user.currentTeam;
	}
	
  this.getTeams = function(callback) {
  	var self = this;
  	if (self.teams)
  		callback(self.teams);
  	else {
	  	Team.query(function(teams) {
	      self.teams = teams;
	      self.currentTeamId = self.user.currentTeam;

	      console.log("Loaded teams:", teams);

	      self.teamMap = _.object(_.map(teams, function(item) {
	   			return [item._id, item]
				}));

				callback(self.teams);
	    });
	  }
  }

  this.getProjects = function(teamId, callback) {
  	var self = this;
  	if (teamId in self.projects)
  		callback(self.projects[teamId]);
  	else {
  		Project.query({ teamId: teamId }, function(projects) {
          $log.log("Loading projects", projects);
          $scope.projects[teamId] = projects;
          callback(projects);
        });
  	}
  };
}]);
