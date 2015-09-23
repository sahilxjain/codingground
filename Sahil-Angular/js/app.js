	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http) {
		// create a message to display in our view
		//$scope.message = 'Everyone come and see how good I look!';
		$scope.loadUsers = function() {
			$http.get('api/data.json').success(function (response){
				$scope.users = response;
			}).error(function (error){
				console.log('Error loading users ', error);
			});
		}

		$scope.editUser = function(user) {
			if(user) {
				for(var i=0; i<$scope.users.length; i++) {
					if($scope.users[i].id === user.id) {
						$scope.selectedUser = $scope.users[i];
					}
				}
			}
		}

		$scope.updateUser = function(){
			if($scope.selectedUser){				
				$http.put('api/update.php/'+$scope.selectedUser.id, $scope.selectedUser).success(function (users){
					console.log('User updated', users);
				}).error(function (error){
					console.log('Error updating user', error);
				})
			}
		}

		$scope.deleteUser = function(user) {
			var Confirm = confirm('Are you sure ?');
			if(Confirm) {
				if(user) {
					$http.delete('api/delete.php/'+ user.id).success(function (response){
						console.log('User deleted', response);
						for(var i=0; i<$scope.users.length; i++) {
							if($scope.users[i].id === user.id) {
								$scope.users.splice(i, 1);
							}
						}
					}).error(function (error){
						console.log('Error deleting user', error);
					});
				}
			}
		}
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});