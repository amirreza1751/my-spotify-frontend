// ROUTES
mySpotify.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
                    template: '<home-component></home-component>',
                    controller: 'homeController'
                })



        .when('/artists', {
            templateUrl: 'pages/artists/artists.html',
            controller: 'artistController',
        })
        .when('/artists/new', {
            templateUrl: 'pages/artists/new-artist.html',
            controller: 'artistController',
        })
        .when('/artists/:id', {
            templateUrl: 'pages/artists/artist-detail.html',
            controller: 'artistController',
        })



        .when('/albums', {
            templateUrl: 'pages/albums/albums.html',
            controller: 'albumController',
        })
        .when('/albums/new', {
            templateUrl: 'pages/albums/new-album.html',
            controller: 'albumController',
        })
        .when('/albums/:id', {
            templateUrl: 'pages/albums/album-details-page.html',
            controller: 'albumController',
        })
});
