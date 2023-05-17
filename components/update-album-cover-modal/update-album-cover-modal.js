mySpotify.component('updateAlbumCoverModal', {
    templateUrl: "components/update-album-cover-modal/update-album-cover-modal.html",
    bindings: {
        modalInstance: "<",
        resolve: "<",
    },
    controller: ['$scope', function($scope) {
        var $ctrl = this;

        $ctrl.$onInit = function() {
            $ctrl.albumCoverForEdit = $ctrl.resolve.modalData.image;
            $ctrl.albumCoverForEditCropped = '';
        }

        $ctrl.handlePreview = function (evt) {
            console.log(evt.files[0])
            var file = evt.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $ctrl.albumCoverForEdit = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        $ctrl.handleClose = function() {
            $ctrl.modalInstance.close($ctrl.albumCoverForEditCropped);
        };

        $ctrl.handleDismiss = function() {
            console.info("in handle dismiss");
            $ctrl.modalInstance.dismiss("cancel");
        };
    }]
});
