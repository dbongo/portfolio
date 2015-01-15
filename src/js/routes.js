angular.module('hackapp')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html'
    })
    .state('tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html'
    })
})
