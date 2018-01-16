// define constants in rootscope for use across app
angular.module('markNewsReaderApp')

	.constant('config', {
	  //todo https endpoint
	  webapi_baseurl: 'http://YOUR_API/api/news/',
	  defaultRegion: 'gb',
	})

    .run(function ($rootScope, config) {
        $rootScope.config = config;
    });