'use strict';
(function(){
    var app = angular.module('sampleApp', ['ui.router']);

    app.config(['$stateProvider', function($stateProvider){
        $stateProvider.state({
            name : "option1",
            templateUrl : "option1.html"
        })
        .state({
            "name" : "option2",
            templateUrl : "option2.html"
        });
    }]);

    app.controller('MainController', ['$state', '$window', function ($state, $window){
        
        var that = this;

        this.options = [
            {
                "tabIndex" : 1,
                "name" : "Option 1",
                "viewState" : "option1",
                "angularEnabled" : true,
                "active" : true
            },
            {
                "tabIndex" : 2,
                "name" : "Option 2",
                "viewState" : "option2",
                "angularEnabled" : true,
                "active" : false
            },
            {
                "tabIndex" : 3,
                "name" : "Option 3",
                "angularEnabled" : false,
                "active" : false
            },
            {
                "tabIndex" : 4,
                "name" : "Option 4",
                "angularEnabled" : false,
                "active" : false
            }
        ];

        this.activeMenu = null;

        var clearAndSetActive = function(selectedOption) {
            if (that.activeMenu) {
                that.activeMenu.active = false;
            }
            selectedOption.active = true;
            that.activeMenu = selectedOption;
        }

        var setStateAndActive = function(selectedOption) {
            clearAndSetActive(selectedOption);
            $state.go(selectedOption.viewState);
        }

        this.clickHandler = function(selectedOption) {
            if (selectedOption.angularEnabled) {
                setStateAndActive(selectedOption);
                return;
            }
            $window.parent.postMessage("gwt:"+selectedOption.tabIndex, "http://localhost:8000");
        }

        var messageHandler = function(evt) {
            console.log(evt);
            for (var i = 0; i<that.options.length; i++) {
                if (evt.data === that.options[i].tabIndex.toString()) {
                    setStateAndActive(that.options[i]);
                    break;
                }
            }
        }

        angular.element($window).bind('message', messageHandler);
        setStateAndActive(this.options[0]);
    }])
}());
