mySpotify.directive('datePicker', function ($parse) {
    return {
        restrict: 'AE',
        templateUrl: 'directives/date-picker/date-picker.html',
        replace: false,
        scope:{
          dt: "="
        },
        transclude: true,
        link: function (scope, element, attrs){
            attrs.$observe('albumDate', function(value){
            value = value.substring(0, value.indexOf("T")).split("-");
            scope.dt = new Date(Number(value[0]), Number(value[1]) - 1, Number(value[2]));
            })
            scope.today = function() {
                scope.dt = new Date();
            };
            scope.today();

            scope.clear = function() {
                scope.dt = null;
            };

            scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            scope.dateOptions = {
                // dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(1800, 1, 1)   ,
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            scope.toggleMin = function() {
                scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
                scope.dateOptions.minDate = scope.inlineOptions.minDate;
            };

            scope.toggleMin();

            scope.open2 = function() {
                scope.popup2.opened = true;
            };

            scope.setDate = function(year, month, day) {
                scope.dt = new Date(year, month, day);
            };

            scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            scope.format = scope.formats[2];
            scope.altInputFormats = ['M!/d!/yyyy'];


            scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < scope.events.length; i++) {
                        var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return scope.events[i].status;
                        }
                    }
                }

                return '';
            }

        }
    }
});
