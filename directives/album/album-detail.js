mySpotify.directive('albumDetail', function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/album/album-detail.html',
        replace: false,
        transclude: true,
        scope: {
            albumEdit : "=",
            artistsInfo: "=",
            genresInfo : "=",
            dt: "=",
            onUpdate: "&",
            openModal: "&",
            albumTitleEditInput: "=",
            albumArtistSelectedEdit: "=",
            albumGenreSelectedEdit: "=",
            onDeleteTrack: "&",
            onReturnToAlbums: "&",
            onDeleteAlbum: "&"
        },
        link: function (scope, element, attrs) {

        }
    }
});
