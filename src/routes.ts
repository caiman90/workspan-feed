import angular = require("angular");

export default class Routes {
    static inject: Array<string> = [
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
    ];
    constructor($locationProvider: ng.ILocationProvider,
                $stateProvider: angular.ui.IStateProvider,
                $urlRouterProvider: angular.ui.IUrlRouterProvider,
                ){

                    $locationProvider.html5Mode({
                        enabled:false,
                        requireBase:false
                    });

                    $locationProvider.hashPrefix('');

                    $urlRouterProvider.otherwise('/');
                    
                    $stateProvider
                        .state('feed',<ng.ui.IState>{
                            url:'/',
                            template: require('./views/feed'),
                            controller: 'feedCtrl',
                            controllerAs: 'vm'
                        })
                        .state('questionDetails',<ng.ui.IState>{
                            url:'/questionDetails/:questionID',
                            template: require('./views/question-details'),
                            controller: 'questionDetailsCtrl',
                            controllerAs: 'vm',
                            params: { question: null , questionID: null}

                        });
                        
                }
}