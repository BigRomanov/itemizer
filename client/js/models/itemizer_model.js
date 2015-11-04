'use strict';

app.service('Itemizer', ['Team', 'Project', 'Task', '$log', function(Team, Project, Task, $log) {
  
  this.user     = null;
	this.teams    = null;
	this.teamProjects = {}; // map team to project
  this.projects = {};
  this.tasks    = {};

	this.setUser = function(user) {
    if (user) {
      this.user = user;
      this.currentTeamId = user.currentTeam;
    }
	}
	
  this.getTeams = function(callback) {
  	var self = this;
  	if (self.teams)
  		callback(self.teams);
  	else {
	  	Team.query(function(teams) {
	      self.teams = teams;
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
  		callback(self.teamProjects[teamId]);
  	else {
  		Project.query({ teamId: teamId }, function(projects) {
          $log.log("Loading projects", projects);
          $scope.teamProjects[teamId] = projects;

          _.each(projects, function(project) {
            self.projects[project._id] = project;
          });

          callback(projects);
        });
  	}
  };

  // Load project and it's tasks
  this.getProject = function(projectId, callback) {
    var self = this;
    if (projectId in self.projects)
      callback(self.projects[projectId]);
    else {
      Project.get({projectId:projectId}, function(project) {
        $log.log("Loaded project", project);
        self.projects[project._id] = project;
        callback(project);
      });
    }
  };

  this.getTasks = function(projectId, callback) {
    var self = this;
    if (projectId in self.tasks)
      callback(self.tasks[projectId]);
    else {
      Task.query({ projectId: projectId }, function(tasks) {
          $log.log("Loading tasks", tasks);
          $scope.tasks[projectId] = tasks;
          callback(tasks);
        });
    }
  };

}]);
