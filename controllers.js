// CONTROLLERS
mySpotify.controller('homeController', function ($scope) {

});

mySpotify.controller('navController', ["$scope", "$location", function ($scope, $location) {

}]);

mySpotify.controller('artistController', ["$scope", "$routeParams", "$log", "$location", "$route", "artistService", "fileService",
    function ($scope, $routeParams, $log, $location, $route, artistService, fileService) {
        $scope.id = $routeParams.id || 1;
        artistService.getArtists().then(function (list) {
            $scope.artists = list;
            $scope.artist = $scope.artists.content.filter(function (item) {
                return item.id == $scope.id;
            })[0];
            $scope.artistNameEditInput = $scope.artist.name;
        });
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;

        };

        $scope.myCroppedImage = '';
        $scope.myImage = '';

        $scope.rectangleWidth = 100;
        $scope.rectangleHeight = 100;

        $scope.cropper = {
            cropWidth: $scope.rectangleWidth,
            cropHeight: $scope.rectangleHeight
        };

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

        $scope.onCreate = function () {
            $scope.file = fileService.dataURLtoFile($scope.myCroppedImage, Date.now() + '.jpg');
            artistService.createArtist($scope.artistNameInput, $scope.file)
                .then(
                    function successCallback(response) {
                        $location.path("/artists/" + response.data.id);
                    },
                    function errorCallback(response) {
                        console.log("An error occurred.", response)
                        alert("An error occurred.")
                    });
        }

        $scope.updateArtist = function () {
            artistService.updateArtist($scope.artist.id, $scope.artistNameEditInput).then(
                function successCallback(response) {
                    $location.path("/artists");
                },
                function errorCallback(response) {
                    console.log("An error occurred.", response)
                    alert("An error occurred.")
                }
            );
        }

    }]);

mySpotify.controller('albumController', ["$scope", "$routeParams", "$log", "$location", "$uibModal", "$route", "albumService", "fileService",
    function ($scope, $routeParams, $log, $location, $uibModal, $route, albumService, fileService) {
        $scope.id = $routeParams.id || 1;
        $scope.album = {};
        albumService.getAlbums().then(function (list) {
            $scope.albums = list;
            $scope.album = $scope.albums.content.filter(function (item) {
                return item.id == $scope.id;
            })[0];
            $scope.albumArtistSelectedEdit = {id: $scope.album.artistId, name: $scope.album.artistName}
            $scope.albumGenreSelectedEdit = {name: $scope.album.genre}
            $scope.albumTitleEditInput = $scope.album.title;
        });
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

        albumService.getArtistsTypeAhead().then(
            function successCallback(response) {
                $scope.artistsInfo = response;
            },
            function errorCallback(response) {
                console.log("An error occurred.", response)
                alert("An error occurred.")
            });

        albumService.getGenresTypeAhead().then(
            function successCallback(response) {
                $scope.genresInfo = response;
            },
            function errorCallback(response) {
                console.log("An error occurred.", response)
                alert("An error occurred.")
            });

        $scope.onCreate = function () {
            $scope.releaseDate = [ $scope.dt.getFullYear(), String($scope.dt.getMonth() + 1).padStart(2, '0'), String($scope.dt.getDate()).padStart(2, '0')].join('-');
            $scope.file = fileService.dataURLtoFile($scope.myCroppedImage, Date.now() + '.jpg');
            albumService.createAlbum($scope.artistSelected.id, $scope.genreSelected.name, $scope.albumTitleInput, $scope.releaseDate, $scope.file)
                .then(
                    function successCallback(response) {
                        $location.path("/artists/" + $scope.artistSelected.id);
                    },
                    function errorCallback(response) {
                        console.log("An error occurred.", response)
                        alert("An error occurred.")
                    });
        }

        $scope.dataForModal = {}
        $scope.openModal = function() {
            console.log("openModal")
            $uibModal.open({
                component: "myModal",
                resolve: {
                    modalData: function() {
                        return $scope.dataForModal;
                    }
                }
            }).result.then(function(result) {
                // console.info("I was closed, so do what I need to do myContent's controller now.  Result was->");
                $scope.oncreateTrack($scope.album.id, result.trackNameInput, result.trackLengthMin, result.trackLengthSec);
                // console.info(result);
            }, function(reason) {
                // console.info("I was dimissed, so do what I need to do myContent's controller now.  Reason was->" + reason);
            });
        };

        $scope.onUpdate = function () {
            $scope.releaseDate = [ $scope.dt.getFullYear(), String($scope.dt.getMonth() + 1).padStart(2, '0'), String($scope.dt.getDate()).padStart(2, '0')].join('-');
            albumService.updateAlbum($scope.album.id,$scope.albumArtistSelectedEdit.id , $scope.albumGenreSelectedEdit.name, $scope.albumTitleEditInput, $scope.releaseDate)
                .then(
                    function successCallback(response) {
                        console.log("Album has been updated successfully.")
                        $route.reload();
                    },
                    function errorCallback(response) {
                        console.log("An error occurred.", response)
                        alert("An error occurred.")
                    });
        }


        $scope.oncreateTrack = function (albumId, trackName, minutes, seconds) {
            albumService.createTrack(albumId, trackName, minutes, seconds)
                .then(
                    function successCallback(response) {
                        console.log("Track added.")
                        $route.reload();
                    },
                    function errorCallback(response) {
                        console.log("An error occurred.", response)
                        alert("An error occurred.")
                    });
        }

        $scope.onDeleteTrack = function (id) {
            albumService.deleteTrack(id).then(
                function successCallback(response) {
                    console.log("Track deleted.")
                    $route.reload();
                },
                function errorCallback(response) {
                    console.log("An error occurred.", response)
                    alert("An error occurred.")
                })
        }

        $scope.onReturnToAlbums = function () {
            $location.path("/albums");
        }

        $scope.onDeleteAlbum = function (id) {
            albumService.deleteAlbum(id).then(
                function successCallback(response) {
                    console.log("Album deleted.")
                    $location.path("/albums");
                },
                function errorCallback(response) {
                    console.log("An error occurred.", response)
                    alert("An error occurred.")
                })
        }

    }]);
