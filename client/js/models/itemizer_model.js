'use strict';

app.service('Itemizer', ['Team', 'Project', 'Task', '$log', '$http', function(Team, Project, Task, $log, $http) {
  
<<<<<<< HEAD
  this.user = null;
	this.teams = null;
	this.projects = {};
  this.tasks = {};

  this.teamMap = {};
  this.projectMap = {};
  this.taskMap = {};

	this.setUser = function(user) {
    console.log("Itemizer::Setting user", user);
    if (user) {
      this.user = user;
=======
  this.user     = null;
	this.teams    = null;
	this.teamProjects = {}; // map team to project
  this.projects = {};
  this.tasks    = {};

	this.setUser = function(user) {
    if (user) {
      this.user = user;
      this.currentTeamId = user.currentTeam;
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
	      console.log("Loaded teams:", teams);
>>>>>>> origin/master

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
    $log.log("Itemizer::getCurrentTeam");
    var self = this;
    if (self.teams) {
      callback(self.currentTeam);
    }
    else {
      $log.log("Itemizer::getCurrentTeam 2");
      self.getTeams(function(teams) {
        $log.log("Itemizer::getCurrentTeam - live", self.currentTeam);
        callback(self.currentTeam);
      })
    }
  }

  this.setCurrentTeam = function(teamId, callback) {
    var self = this;
    self.user.currentTeam = teamId;
    $http.post('/user/team', {
      userId: self.user._id,
      teamId: teamId,
    }).then(function(response) {
      self.currentTeam = self.teamMap[self.user.currentTeam];
      if (callback)
        callback(null, self.currentTeam);
    }, function(response) {
      $log.warn("Unable to set team as current", response);
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
<<<<<<< HEAD
          self.projects[teamId] = projects;

          self.projectMap = _.object(_.map(projects, function(item) {
            return [item._id, item]
          }));
=======
          $scope.teamProjects[teamId] = projects;

          _.each(projects, function(project) {
            self.projects[project._id] = project;
          });
>>>>>>> origin/master

          callback(projects);
        });
  	}
  };

<<<<<<< HEAD
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
=======
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

>>>>>>> origin/master
}]);
