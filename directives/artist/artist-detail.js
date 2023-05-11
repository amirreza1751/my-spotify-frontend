mySpotify.directive('artistDetail', function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/artist/artist-detail.html',
        replace: false,
        transclude: true,
        scope: {
            artist: "=",
            artistNameEditInput: "="
        }
    }
});
