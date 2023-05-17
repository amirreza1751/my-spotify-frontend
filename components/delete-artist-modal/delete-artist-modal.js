mySpotify.component('deleteArtistModal', {
    templateUrl: "components/delete-artist-modal/delete-artist-modal.html",
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: [function() {
        var $ctrl = this;

        $ctrl.$onInit = function() {
            $ctrl.modalData = $ctrl.resolve.modalData;
        }

        $ctrl.handleClose = function() {
            console.log("called")
            $ctrl.modalInstance.close($ctrl.modalData);
        };

        $ctrl.handleDismiss = function() {
            $ctrl.modalInstance.dismiss("cancel");
        };
    }]
});
