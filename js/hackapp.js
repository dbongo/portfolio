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

angular.module('hackapp')
.controller('MainCtrl', ['$scope', '$cookieStore', function MainCtrl($scope, $cookieStore) {
    var mobileView = 992

    $scope.getWidth = function() {
        return window.innerWidth
    }

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true
            } else {
                $scope.toggle = true
            }
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

angular.module('hackapp')
.directive('rdLoading', function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    }
    return directive
})

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
