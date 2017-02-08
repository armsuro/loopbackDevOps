'use strict';

angular
    .module('app', [
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
        $urlRouterProvider) {

    }])
    .controller('pullController', ['$scope', function($scope) {
        $scope.pull = function(pull) {
        	console.log(pull)
        }
    }]);