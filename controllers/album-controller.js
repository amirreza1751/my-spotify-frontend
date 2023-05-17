mySpotify.controller('albumController', ["$scope", "$routeParams", "$log", "$location", "$uibModal", "$route", "albumService", "fileService",
    function ($scope, $routeParams, $log, $location, $uibModal, $route, albumService, fileService) {
        $scope.id = $routeParams.id || 0;
        $scope.album = {};
        albumService.getAlbums().then(function (list) {
            $scope.albums = list;
            $scope.album = $scope.albums.content.filter(function (item) {
                return item.id == $scope.id;
            })[0];
            if ($scope.id != 0){
                $scope.albumArtistSelectedEdit = {id: $scope.album.artistId, name: $scope.album.artistName}
                $scope.albumGenreSelectedEdit = {name: $scope.album.genre}
                $scope.albumTitleEditInput = $scope.album.title;
            }
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

        $scope.dataForAddTrackModal = {}
        $scope.openAddTrackModal = function() {
            console.log("openModal")
            $uibModal.open({
                component: "AddTrackModal",
                resolve: {
                    modalData: function() {
                        return $scope.dataForAddTrackModal;
                    }
                }
            }).result.then(function(result) {
                $scope.oncreateTrack($scope.album.id, result.trackNameInput, result.trackLengthMin, result.trackLengthSec);
            }, function(reason) {
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

        $scope.onUpdateTrack = function (track) {
            albumService.updateTrack(track.id, track.name, track.minutes, track.seconds)
                .then(
                    function successCallback(response) {
                        console.log("Track updated.")
                        $route.reload();
                    },
                    function errorCallback(response) {
                        console.log("An error occurred.", response)
                        alert("An error occurred.")
                    });
        }
        $scope.getMinutes = function (duration){
            return albumService.getMinutes(duration);
        }
        $scope.getSeconds = function (duration){
            return albumService.getSeconds(duration);
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
            window.history.back();
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

        $scope.openUpdateAlbumCoverModal = function () {
            var modalInstance = $uibModal.open({
                component: 'updateAlbumCoverModal',
                resolve: {
                    modalData: function () {
                        return {
                            image: $scope.album.cover
                        }
                    }
                }
            });
            modalInstance.result.then(function (croppedImage) {
                $scope.album.coverForEdit = fileService.dataURLtoFile(croppedImage, Date.now() + '.jpg');
                albumService.updateAlbumCover($scope.album.id, $scope.album.coverForEdit).then(function (){
                    $route.reload();
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

    }]);
