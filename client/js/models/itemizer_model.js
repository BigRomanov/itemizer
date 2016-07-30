'use strict';

app.service('Itemizer', ['Team', 'Project', 'Task', '$log', '$http', function(Team, Project, Task, $log, $http) {
  
  this.user     = null;
	this.teams    = null;
	this.teamProjects = {}; // map team to project
  this.projects = {};
  this.tasks    = {};

	this.setUser = function(user) {
    if (user) {
      console.log("Set user", user);
      this.user = user;
      this.currentTeamId = user.currentTeam;
    }
	}
	
  this.getTeams = function(callback) {
    $log.log("Itemizer::getTeams");
  	var self = this;
  	if (self.teams) {
      if (callback) {
  		  callback(self.teams);
      }
    }
  	else {
	  	Team.query(function(teams) {
	      self.teams = teams;

	      self.teamMap = _.object(_.map(teams, function(item) {
	   			return [item._id, item]
				}));

        self.currentTeam = self.teamMap[self.user.currentTeam];

        if (callback)
				  callback(self.teams);
	    });
	  }
  }

  this.getCurrentTeam = function(callback) {
    var self = this;
    if (self.teams) {
      callback(self.currentTeam);
    }
    else {;
      self.getTeams(function(teams) {
        callback(self.currentTeam);
      })
    }
  }

  this.setCurrentTeam = function(teamId, callback) {
    var self = this;
    self.user.currentTeam = teamId;
    $http.post('/user/team', { userId: self.user._id, teamId: teamId,}) 
    .then(function(response) {
      self.currentTeam = self.teamMap[self.user.currentTeam];
      if (callback)
        callback(null, self.currentTeam);
    }, function(response) {
      callback("Unable to set team as current", null);
    });
  }

  this.getProjects = function(teamId, callback) {
  	var self = this;
  	if (teamId in self.projects)
  		callback(self.teamProjects[teamId]);
  	else {
  		Project.query({ teamId: teamId }, function(projects) {
          $log.log("Loading projects", projects);

          self.teamProjects[teamId] = projects;

          _.each(projects, function(project) {
            self.projects[project._id] = project;
          });

          callback(projects);
        });
  	}
  };

  this.getProject = function(projectId, callback) {
    var self = this;
    if (projectId in self.projectMap) {
      callback(self.projectMap[projectId]);
    }
    else {
       Project.get({projectId:projectId}, function(project) {
        $log.log("Loaded project", project);
        self.projectMap[projectId] = project;
        callback(project);
    });
    }
  }

  this.getTasks = function(projectId, callback) {
    var self = this;
    if (projectId in self.tasks) {
      $log.log("Itemizer::getTasks - cache", self.tasks);
      if (callback) {
        callback(self.tasks[projectId]);
      }
    }
    else {
      Task.query({ projectId: projectId }, function(tasks) {
        $log.log("Itemizer::getTasks - live", tasks);
        self.tasks[projectId] = tasks;

        self.taskMap = _.object(_.map(tasks, function(item) {
          return [item._id, item]
        }));

        if (callback) {
          callback(tasks);  
        }
      });
    }
  };

  this.getTask = function(taskId, callback) {
    var self = this;
    if (taskId in self.taskMap) {
      callback(self.taskMap[taskId]);
    }
    else {
      Task.get({taskId:taskId}, function(task) {
        $log.log("Loaded task", task);
        self.taskMap[taskId] = task;
        callback(task);
      });
    }
  }

  this.addTask = function(task, callback) {
    var self = this;
    task.$save(function(_task) {
      $log.log("Created new task", _task);
      self.taskMap[_task._id] = task;
      self.tasks[_task.project._id].upshift(_task);
      if (callback) {
        callback(_task);
      }
    })
  }
}]);
