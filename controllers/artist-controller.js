mySpotify.controller('artistController', ["$scope", "$routeParams", "$log", "$location", "$route", "$uibModal", "artistService", "fileService",
    function ($scope, $routeParams, $log, $location, $route, $uibModal, artistService, fileService) {
        $scope.id = $routeParams.id || 0;
        artistService.getArtists().then(function (list) {
            $scope.artists = list;
            if ($scope.id != 0){
                $scope.artist = $scope.artists.content.filter(function (item) {
                    return item.id == $scope.id;
                })[0];
                $scope.artistNameEditInput = $scope.artist.name;
                $scope.dataForUpdateArtistPictureModal = {artist: $scope.artist}
            }
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

        $scope.handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', $scope.handleFileSelect);

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

        $scope.openUpdateArtistPictureModal = function () {
            var modalInstance = $uibModal.open({
                component: 'updateArtistPictureModal',
                resolve: {
                    modalData: function () {
                        return {
                            image: $scope.artist.profilePicture
                        }
                    }
                }
            });
            modalInstance.result.then(function (croppedImage) {
                $scope.artist.imageForEdit = fileService.dataURLtoFile(croppedImage, Date.now() + '.jpg');
                artistService.updateArtistProfilePicture($scope.artist.id, $scope.artist.imageForEdit).then(function (){
                    $route.reload();
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.openDeleteArtistModal = function (artistId) {
            var modalInstance = $uibModal.open({
                component: 'deleteArtistModal',
                resolve: {
                    modalData: function () {
                        return {
                            artistId: artistId
                        }
                    }
                }
            });
            modalInstance.result.then(function (artistId) {
                artistService.deleteArtist(artistId.artistId).then(function () {
                    $route.reload();
                })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

    }]);
