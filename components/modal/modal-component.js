mySpotify.component('myModal', {
    templateUrl: "components/modal/myModal.html",
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
            console.info("in handle close");
            if ($ctrl.modalData.trackNameInput === undefined || $ctrl.modalData.trackLengthMin === undefined || $ctrl.modalData.trackLengthSec === undefined){
                return;
            }
            console.log("called")
            $ctrl.modalInstance.close($ctrl.modalData);
        };

        $ctrl.handleDismiss = function() {
            console.info("in handle dismiss");
            $ctrl.modalInstance.dismiss("cancel");
        };
    }]
});
