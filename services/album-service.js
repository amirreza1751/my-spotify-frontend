mySpotify.service('albumService', ['$http', function ($http){
    this.getAlbums = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/albums'
        }).then(function successCallback(response) {
            // console.log(response.data)
            return response.data;
        }, function errorCallback(response) {
            console.log("An error occurred.")
        });
    }

    this.getArtistsTypeAhead = function (){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/artists/typeahead'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log("An error occurred.")
        });
    }

    this.getGenresTypeAhead = function (){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/albums/genres/typeahead'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log("An error occurred.")
        });
    }

    this.createAlbum = function (artistId, genre, albumTitleInput, releaseDate, albumCover) {
        let uploadUrl = "http://localhost:8080/api/albums";
        let fd = new FormData();
        fd.append("artistId", artistId)
        fd.append("genre", genre)
        fd.append("albumTitle", albumTitleInput)
        fd.append("releaseDate", releaseDate)
        fd.append("file", albumCover)
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

    this.updateAlbum = function (albumId, artistId, genre, albumTitleInput, releaseDate) {
        let uploadUrl = "http://localhost:8080/api/albums/"+albumId;
        let fd = new FormData();
        fd.append("artistId", artistId)
        fd.append("genre", genre)
        fd.append("albumTitle", albumTitleInput)
        fd.append("releaseDate", releaseDate)
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

    this.createTrack = function (albumId, trackName, minutes, seconds) {
        let uploadUrl = "http://localhost:8080/api/tracks?albumId="+albumId;
        return $http.post(uploadUrl,{
            name: trackName,
            minutes: minutes,
            seconds: seconds
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            console.log("An error occurred.", response)
            alert("An error occurred.")
        });
    }

    this.deleteTrack = function (id) {
        let url = "http://localhost:8080/api/tracks/"+id;
        return $http.delete(url)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                console.log("An error occurred.", response)
                alert("An error occurred.")
            });
    }


    this.updateTrack = function (id, name, minutes, seconds){
        let url = "http://localhost:8080/api/tracks/"+id;
        return $http.put(url,{
            name: name,
            minutes: minutes,
            seconds: seconds
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            console.log("An error occurred.", response)
            alert("An error occurred.")
        });
    }

    this.deleteAlbum = function (id) {
        let url = "http://localhost:8080/api/albums/"+id;
        return $http.delete(url)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                console.log("An error occurred.", response)
                alert("An error occurred.")
            });
    }

    this.getMinutes = function (durationString){
        return parseInt(durationString.replace("M", "").split(" ")[0]);
    }

    this.getSeconds = function (durationString){
        return parseInt(durationString.replace("S", "").split(" ")[1]);
    }


    this.updateAlbumCover = function (albumId, cover) {
        let uploadUrl = "http://localhost:8080/api/albums/" + albumId + "/cover";
        let fd = new FormData();
        fd.append("file", cover)
        fd.append("id", albumId)
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
