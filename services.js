//SERVICE

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

}]);


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

}]);

mySpotify.service('fileService', [function () {

    this.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

}]);
