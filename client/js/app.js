'use strict';
var apiUrl = (window.location.href.indexOf('0.0.0.0') < 0) ? "0.0.0.0:3000" : "devops.kulu.io";
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
                            alert(data + " Pull Started")
                            deffered.resolve(response)
                        })
                        .error(function(response, status) {
                            alert(data + " Pull Not Started")
                            deffered.reject(response);
                        });
                    return deffered.promise;
                }
            }

        }
    ])
    .controller('pullController', ['$scope', 'PullService', function($scope, PullService) {
        $scope.projects = [{
            name: "DataOwlServer",
            project: "dataowl"
        }, {
            name: "DataOwlClient",
            project: "dataowl"
        }, {
            name: "DataOwlManager",
            project: "dataowl"
        }, {
            name: "DataOwlFrontEnd",
            project: "dataowl"
        }, {
            name: "EnviClient",
            project: "envi"
        }, {
            name: "EnviServer",
            project: "envi"
        }, {
            name: "OxfordServer",
            project: "oxford"
        }, {
            name: "OxfordClient",
            project: "oxford"
        }, {
            name: "TheGoodApi",
            project: "thegood"
        }, {
            name: "TheGoodClient",
            project: "thegood"
        }, {
            name: "TheGoodCMS",
            project: "thegood"
        }, {
            name: "DevOps",
            project: "devops"
        }]
        $scope.pull = function(pull) {
            PullService.pull(pull)
        }
        $scope.pullProgect = function() {
            console.log($scope.selectedItem)
        }
    }]);