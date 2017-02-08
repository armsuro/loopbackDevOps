'use strict';
var apiUrl = (window.location.href.indexOf('0.0.0.0') < 0) ? "0.0.0.0:3000" : "";
angular
    .module('app', [
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
        $urlRouterProvider) {

    }])
    .factory("PullService", ["$http", "$q",
        function($http, $q) {

            return {
                pull: function(data) {
                    var deffered = $q.defer();
                    $http({
                            method: "POST",
                            url: apiUrl + "/pull",
                            data: {
                                "project": data
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .success(function(response) {
                            deffered.resolve(response)
                        })
                        .error(function(response, status) {
                            deffered.reject(response);
                        });
                    return deffered.promise;
                }
            }

        }
    ])
    .controller('pullController', ['$scope', 'PullService', function($scope, PullService) {
        $scope.pull = function(pull) {
            PullService.pull(pull)
        }
    }]);