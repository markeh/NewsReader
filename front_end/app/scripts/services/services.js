angular.module('markNewsReaderApp.services', [])

.constant("connectionConstants", {
    "request_timeout": 3000,
})

// GET requests from WebAPI
.service('newsService', function($http, $rootScope, connectionConstants, $httpParamSerializer) {
    
    this.getNews = function(region) {
        
		var resp = $http({
            url: $rootScope.config.webapi_baseurl +  region,
            method: "GET",
            timeout: connectionConstants.request_timeout
        });
        return resp;
    };

    this.searchNews = function(region, query) {
        
    	var querystring = $httpParamSerializer(query);

		var resp = $http({
            url: $rootScope.config.webapi_baseurl +  region + "/" + querystring,
            method: "GET",
            timeout: connectionConstants.request_timeout
        });
        return resp;
    };
});
