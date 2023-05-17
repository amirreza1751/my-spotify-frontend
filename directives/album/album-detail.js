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
            openAddTrackModal: "&",
            openUpdateAlbumCoverModal: "&",
            albumTitleEditInput: "=",
            albumArtistSelectedEdit: "=",
            albumGenreSelectedEdit: "=",
            onDeleteTrack: "&",
            onUpdateTrack: "&",
            onReturnToAlbums: "&",
            onDeleteAlbum: "&",
            getMinutes: "&",
            getSeconds: "&",
            trackNameEditInput: "=",
            trackMinutesEditInput: "=",
            trackSecondsEditInput: "=",
        },
        link: function (scope, element, attrs) {

        }
    }
});
