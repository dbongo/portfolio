'use strict';

angular.module('hackapp', ['ui.bootstrap', 'ui.router', 'ngCookies'])

angular.module('hackapp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
}])

// angular.module('hackapp').constant('API_URL', 'http://localhost:8080')

angular.module('hackapp')
.controller('AlertsCtrl', ['$scope', function AlertsCtrl($scope) {
    $scope.alerts = [
        {
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
        },
        {
            type: 'danger',
            msg: 'Found a bug? Create an issue with as many details as you can.'
        }
    ]
    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        })
    }
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1)
    }
}])

// angular.module('hackapp').controller('AppCtrl', function AppCtrl(Auth) {
//     var vm = this
//
//     vm.getCurrentUser = Auth.getCurrentUser
//     vm.logout = Auth.logout
// })

// angular.module('hackapp').controller('LoginCtrl', function LoginCtrl($state, Auth) {
//     var vm = this
//     vm.alerts = []
//     vm.user = {}
//
//     function login(form) {
//         if (form.$valid) {
//             Auth.login({
//                 email: vm.user.email,
//                 password: vm.user.password
//             })
//             .then(function() {
//                 vm.alerts = []
//                 $state.go('posts')
//             })
//             .catch(function(err) {
//                 vm.alerts.push({
//                     type: "danger",
//                     msg: err.message
//                 })
//                 Auth.logout()
//             })
//         }
//     }
//     vm.login = login
//
//     function closeAlert(index) {
//         vm.alerts.splice(index, 1)
//     }
//     vm.closeAlert = closeAlert
// })

angular.module('hackapp')
.controller('MainCtrl', ['$scope', '$cookieStore', function MainCtrl($scope, $cookieStore) {
    var mobileView = 992

    $scope.getWidth = function() {
        return window.innerWidth
    }

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle')))
                $scope.toggle = !$cookieStore.get('toggle') ? false : true
            else
                $scope.toggle = true
        } else {
            $scope.toggle = false
        }
    })

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle
        $cookieStore.put('toggle', $scope.toggle)
    }

    window.onresize = function() {
        $scope.$apply()
    }
}])

// angular.module('hackapp').controller('PostsCtrl', function PostsCtrl(Posts, Auth) {
//     var vm = this
//     vm.posts = []
//
//     Posts.fetch().then(function(posts) {
//         vm.posts = posts
//     })
//
//     function addPost() {
//         if (vm.postBody) {
//             Posts.create({
//                 username: Auth.getCurrentUser().username,
//                 body: vm.postBody
//             })
//             .then(function(res) {
//                 vm.postBody = null
//                 vm.posts.push(res.data)
//             })
//         }
//     }
//     vm.addPost = addPost
// })

// angular.module('hackapp').controller('RegisterCtrl', function RegisterCtrl($state, Auth) {
//     var vm = this
//     vm.alerts = []
//     vm.user = {}
//
//     function register(form) {
//         if (form.$valid) {
//             Auth.register({
//                 email: vm.user.email,
//                 username: vm.user.username,
//                 password: vm.user.password2
//             })
//             .then(function() {
//                 vm.alerts = []
//                 $state.go('posts')
//             })
//             .catch(function(err) {
//                 vm.alerts.push({
//                     type: "danger",
//                     msg: err.message
//                 })
//                 Auth.logout()
//             })
//         }
//     }
//     vm.register = register
//
//     function closeAlert(index) {
//         vm.alerts.splice(index, 1)
//     }
//     vm.closeAlert = closeAlert
// })

angular.module('hackapp')
.directive('rdLoading', function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    }
    return directive
})

// angular.module('hackapp').directive('match', function match() {
//     return {
//         require: 'ngModel',
//         restrict: 'A',
//         scope: {
//             match: '='
//         },
//         link: function(scope, elem, attrs, ctrl) {
//             scope.$watch(function() {
//                 return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue
//             }, function(currentValue) {
//                 ctrl.$setValidity('match', currentValue)
//             })
//         }
//     }
// })

angular.module('hackapp')
.directive('rdWidgetBody', function rdWidgetBody() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    }
    return directive
})

angular.module('hackapp')
.directive('rdWidgetFooter', function rdWidgetFooter() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    }
    return directive
})

angular.module('hackapp')
.directive('rdWidgetHeader', function rdWidgetTitle() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><i class="fa" ng-class="icon"></i> {{title}} <div class="pull-right" ng-transclude></div></div>',
        restrict: 'E'
    }
    return directive
})

angular.module('hackapp')
.directive('rdWidget', function rdWidget() {
    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    }
    return directive

    function link(scope, element, attrs) {
        /* */
    }
})

// angular.module('hackapp').service('Auth', function Auth($http, TokenFactory, API_URL) {
//     var currentUser = {}
//
//     function login(user) {
//         return $http.post(API_URL + '/auth/login', user).then(function(res) {
//             currentUser = res.data
//             TokenFactory.set(currentUser.token)
//             return res.data
//         })
//     }
//
//     function register(user) {
//         return $http.post(API_URL + '/auth/register', user).then(function(res) {
//             currentUser = res.data
//             TokenFactory.set(currentUser.token)
//             return res.data
//         })
//     }
//
//     function logout() {
//         TokenFactory.set()
//         currentUser = {}
//     }
//
//     function getCurrentUser() {
//         return currentUser
//     }
//
//     var service = {
//         login: login,
//         register: register,
//         logout: logout,
//         getCurrentUser: getCurrentUser
//     }
//     return service
// })

// angular.module('hackapp').factory('AuthInterceptor', function AuthInterceptor($q, $rootScope, TokenFactory) {
//
//     function request(config) {
//         config.headers = config.headers || {}
//         var token = TokenFactory.get()
//         if (token) {
//             config.headers.Authorization = 'Bearer ' + token
//         }
//         return config
//     }
//
//     function responseError(rejection) {
//         if ((rejection.status === 401) || (rejection.status === 403)) {
//             $rootScope.$broadcast('Auth:Required')
//         } else if (rejection.status === 419) {
//             $rootScope.$broadcast('Auth:Forbidden')
//         }
//         return $q.reject(rejection)
//     }
//
//     return {
//         request: request,
//         responseError: responseError
//     }
// })

// angular.module('hackapp').service('Posts', function Posts($http, API_URL) {
//
//     function fetch() {
//         return $http.get(API_URL + '/api/posts').then(function(res) {
//             return res.data
//         })
//     }
//
//     function create(post) {
//         return $http.post(API_URL + '/api/posts', post)
//     }
//
//     var service = {
//         fetch: fetch,
//         create: create
//     }
//     return service
// })

// angular.module('hackapp').factory('TokenFactory', function TokenFactory($window) {
//     var store = $window.localStorage
//     var key = 'access_token'
//
//     function getToken() {
//         return store.getItem(key)
//     }
//
//     function setToken(token) {
//         if (token) {
//             store.setItem(key, token)
//         } else {
//             store.removeItem(key)
//         }
//     }
//
//     return {
//         get: getToken,
//         set: setToken
//     }
// })
