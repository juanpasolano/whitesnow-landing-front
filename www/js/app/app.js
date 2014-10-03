var ngApp =  angular.module('landing', ['ngRoute']);


ngApp.config([ '$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'LandingCtrl'
            })
            .when('/invite/:id/:token', {
                templateUrl: 'partials/home.html',
                controller: 'LandingCtrl'
            })
            .when('/invite/new', {
                templateUrl: 'partials/invites/new.html',
                controller: 'NewInviteCtrl'
            })
            .when('/invite/compose', {
                templateUrl: 'partials/invites/compose.html',
                controller: 'SendInviteCtrl'
            })
            .when('/terms', {
                templateUrl: 'partials/terms.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    }
]);

ngApp.controller('MainCtrl', [ '$scope','$anchorScroll', '$location', '$rootScope',
    function($scope, $anchorScroll, $location, $rootScope) {

        var hostname = window.location.hostname;
        $rootScope.server;
        if (hostname == 'localhost') {
            $rootScope.server = 'http://localhost:1337/';
        } else {
            $rootScope.server = 'http://vetheroes.co:1337/'
        }

        $scope.scrollTo = function(to){
            console.log(to);
            $location.hash(to);
            // call $anchorScroll()
            $anchorScroll();
        }
    }
]);

ngApp.controller('LandingCtrl', [ '$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams,  $http){

        var inviteId = $routeParams.id;
        var inviteToken = $routeParams.token;
        $scope.inviteInfo = {};
        $scope.isInvited =  false;
        $scope.formActive =  true;

        /*
        * If we have an invitation Id go get the damn information
        * */
        if (inviteId) {
            $http.get($rootScope.server+'invite/getsafe/'+inviteId+'/'+inviteToken).success(function(data){
                $scope.inviteInfo = data;
                $scope.isInvited = true;
                if(data.status == 2){
                    $scope.formActive =  false;
                }
            });
        }

        $scope.sendForm = function(){
            console.log('sending form');
            if ($scope.isInvited) {
                $http.post($rootScope.server+'invite/confirm/' + inviteId, $scope.inviteInfo)
                    .success(function(data){
                        $scope.formActive = false;
                        ga('send', 'event', 'form', 'submit', 'invite_confirm', 0);
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }else{
                $scope.inviteInfo.status = 3;
                $http.post($rootScope.server+'invite/request', $scope.inviteInfo)
                    .success(function(data){
                        $scope.formActive = false;
                        ga('send', 'event', 'form', 'submit', 'invite_request', 0);
                    })
                    .error(function(err){
                        console.log(err);
                    });
            }
        };
    }
]);

ngApp.controller('NewInviteCtrl', [ '$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){
        $scope.inviteInfo = {};
        $scope.newInvitation = function(){
            $http.post($rootScope.server+'invites', $scope.inviteInfo)
                .success(function(data){
                    alert('Invitacion guardada correctamente');
                })
                .error(function(err){
                    $scope.error = err;
                    console.log(err);
                });
        }
    }
]);

ngApp.controller('SendInviteCtrl', [ '$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http){

        $http.get($rootScope.server+'invites').success(function(data){
            $scope.invites =  data;
        });
        $scope.sendInvite =  function(invite){

            $http.post($rootScope.server+'invites/send', invite)
                .success(function(data){
                    alert(data);
                    console.log(data);
                })
                .error(function(err){
                    console.log(err);
                });
        }
    }
])



/*
 Icon Validation
 Simply puts icon code into element if valid

 <i class="ionicons-font" mb-icon-validation="form.name"></i>

 * */

ngApp.directive('mbIconValidation',['$rootScope', '$timeout', '$parse',
    function($rootScope, $timeout, $parse){
        return{
            scope:{
                validationObj: '=mbIconValidation',
            },
            link: function(scope, element, attrs){
                var okIcon = '&#xe0d9;';
                var failIcon = '&#xe0e0;';
                scope.$watchCollection('[validationObj.$valid, validationObj.$pristine]', function(n,o){
                    if(scope.validationObj){
                        if(scope.validationObj.$valid === true && scope.validationObj.$pristine === false){
                            element.html(okIcon); //Ok icon
                            element.css('color', '#59c063');
                        }else if(scope.validationObj.$valid === false && scope.validationObj.$pristine === false){
                            element.html(failIcon);
                            element.css('color', '#F10C15');
                        }else{
                            element.html('');
                        }
                    }
                });
            }
        };
    }
]);