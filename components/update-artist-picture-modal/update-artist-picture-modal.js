mySpotify.component('updateArtistPictureModal', {
    templateUrl: "components/update-artist-picture-modal/update-artist-picture-modal.html",
    bindings: {
        modalInstance: "<",
        resolve: "<",
    },
    controller: ['$scope', function($scope) {
        var $ctrl = this;

        $ctrl.$onInit = function() {
            $ctrl.artistImageForEdit = $ctrl.resolve.modalData.image;
            $ctrl.artistImageForEditCropped = '';
        }

        $ctrl.handlePreview = function (evt) {
            console.log(evt.files[0])
            var file = evt.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $ctrl.artistImageForEdit = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $ctrl.handleClose = function() {
            $ctrl.modalInstance.close($ctrl.artistImageForEditCropped);
        };

        $ctrl.handleDismiss = function() {
            console.info("in handle dismiss");
            $ctrl.modalInstance.dismiss("cancel");
        };
    }]
});
