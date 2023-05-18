mySpotify.component('homeComponent', {
    template: "<p ng-repeat='artist in $ctrl.artists'>{{artist.id + '_' + artist.name}}</p> <button ng-click='$ctrl.openModal()'>Open</button>" +
        "<button ng-click='$ctrl.updateArtist()'>update</button>" +
        "<div class=\"alert\" ng-class=\"$ctrl.alertClass\" ng-show=\"$ctrl.showAlert\">\n" +
        "  {{$ctrl.alertMessage}}\n" +
        "</div>",
    bindings: {
        artists: "<"
    },
    controller: ['$scope', '$http', '$uibModal', '$timeout', 'ngToast', function($scope, $http, $uibModal, $timeout, ngToast) {
        var $ctrl = this;

        $ctrl.showAlert = false;
        $ctrl.alertClass = '';
        $ctrl.alertMessage = '';

        $ctrl.$onInit = function() {

            $ctrl.getArtists()
                .then(function(response) {
                    $ctrl.artists = response.data;
                })
                .catch(function(error) {
                    console.error("Error fetching artists:", error);
                });
        };

        this.getArtists = function () {
            return $http.get('http://localhost:8080/api/artists/typeahead');
        }

        this.updateArtist = function () {
            let uploadUrl = "http://localhost:8080/api/artists/"+'1';
            return $http.put(uploadUrl,{
                name: "New Name",
            }).then(function successCallback(response) {
                ngToast.create({
                    content: 'Hello from ngToast!',
                    dismissButton: true,
                    timeout: 3000,
                    className: 'success',
                    dismissOnClick: true,
                    verticalPosition: 'bottom'
                });
                // $ctrl.showResponseMessage(true, 'alert-success', 'Request successful!');
                // $ctrl.hideResponseMessageAfterTimeout();
                return response;
            }, function errorCallback(response) {
                console.log("An error occurred.", response)
                ngToast.create({
                    content: response.data.error,
                    dismissButton: true,
                    timeout: 3000,
                    className: 'warning',
                    dismissOnClick: true
                });
                alert("An error occurred.")
            });
        }

        this.showResponseMessage = function(show, alertClass, message) {
            $ctrl.showAlert = show;
            $ctrl.alertClass = alertClass;
            $ctrl.alertMessage = message;
        };

        this.hideResponseMessageAfterTimeout = function() {
            $timeout(function() {
                $ctrl.showAlert = false;
            }, 3000); // Hide after 3 seconds (adjust as needed)
        };

        this.openModal = function () {
            var modalInstance = $uibModal.open({
                component: 'deleteArtistModal',
                resolve: {
                    modalData: function () {
                        return {
                            artistId: 555
                        }
                    }
                }
            });
            modalInstance.result.then(function (artistId) {
                // artistService.deleteArtist(artistId.artistId).then(function () {
                //     $route.reload();
                // })
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }
    }]
});
