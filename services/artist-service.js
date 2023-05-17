mySpotify.service('artistService', ['$http', function ($http){
    this.getArtists = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/artists'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log("An error occurred.")
        });
    }
    this.createArtist = function (artistNameInput, profilePicture) {
        console.log(artistNameInput)
        let uploadUrl = "http://localhost:8080/api/artists";
        let fd = new FormData();
        fd.append("file", profilePicture)
        fd.append("name", artistNameInput)
        return $http.post(uploadUrl, fd,{
            transformRequest: angular.indentity,
            headers: {'content-type': undefined, 'Process-Data': false}
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            console.log("An error occurred.", response)
            alert("An error occurred.")
        });
    }

    this.updateArtist = function (id, name){
        console.log(id, name)
        let uploadUrl = "http://localhost:8080/api/artists/"+id;
        return $http.put(uploadUrl,{
            name: name,
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            console.log("An error occurred.", response)
            alert("An error occurred.")
        });
    }

    this.deleteArtist = function (id) {
        let url = "http://localhost:8080/api/artists/"+id;
        return $http.delete(url)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                console.log("An error occurred.", response)
                alert("An error occurred.")
            });
    }


    this.updateArtistProfilePicture = function (artistId, profilePicture) {
        let uploadUrl = "http://localhost:8080/api/artists/" + artistId + "/profile-picture";
        let fd = new FormData();
        fd.append("file", profilePicture)
        fd.append("id", artistId)
        return $http.put(uploadUrl, fd,{
            transformRequest: angular.indentity,
            headers: {'content-type': undefined, 'Process-Data': false}
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            console.log("An error occurred.", response)
            alert("An error occurred.")
        });
    }
}]);


