var mySpotify = angular.module('mySpotify', ['ngRoute', 'ngResource', 'ui.bootstrap','ngAnimate', 'ngSanitize', 'uiCropper', 'angularFileUpload']);

mySpotify.filter('startFrom', function() {
    return function(input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
