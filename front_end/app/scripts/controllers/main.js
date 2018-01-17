'use strict';

/**
 * @ngdoc function
 * @name markNewsReaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the markNewsReaderApp
 */
angular.module('markNewsReaderApp')
    .controller('MainCtrl', function($scope, $rootScope, newsService, $filter, $timeout, $window) {

    	//Pagination
        $scope.pager = false;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 5;

        //API connection state
        $scope.connectionError = false;

		//Response from API for main view
		$scope.news = {
            'articles': null
        };
        
        //Saved news for saved modal
        $scope.savedNews = {
            'articles': []
        };

        //Used for GET querystring
        $scope.date = {
            'now': new Date()
        };

        $scope.region = $rootScope.region;
        $scope.querystring = {
            'q': '',
            'sortBy': 'popularity',
            'from': $filter('date')($scope.date.now, 'yyyy-MM-dd')
        }


        //Saving user data to local storage
        if (localStorage.getItem("savedNews") != null) {
            $scope.savedNews.articles = angular.fromJson(localStorage.getItem('savedNews'));
        }
//FIX
        if (localStorage.getItem("region") != null) {
            $scope.region = angular.fromJson(localStorage.getItem('region'));
        } else {
        	$scope.region = $rootScope.config.defaultRegion;
            localStorage.setItem('region', angular.toJson($scope.region));
        }


        //Using the search endpoint
        $scope.search = function() {

            
                 var promiseSearch = newsService.searchNews($scope.region, $scope.querystring);
            }

            promiseSearch.then(function(resp) {

                $scope.connectionError = false;
                if (resp.data.articles.length > 0) {
                    $scope.news.articles = resp.data.articles;
                    $scope.paging();
                } else {
                    //todo improve user feedback
                    alert("No search results");
                }

            }, function(err) {
                console.log("An error has occurred, please ensure you are online and try again");
                $scope.connectionError = true;
            });

        }


		//Using the top stories endpoint
        $scope.refreshNews = function() {

            $scope.date.now = new Date()
            var promiseNews = newsService.getNews($scope.region);

            promiseNews.then(function(resp) {

                $scope.connectionError = false;
                if (resp.data.articles.length > 0) {
                    $scope.querystring.q = '';
                    $scope.news.articles = resp.data.articles;
                    $scope.paging();
                } else {
                	//todo improve user feedback
                    alert("problem retrieving stories");
                }

            }, function(err) {
                console.log("An error has occurred, please ensure you are online and try again");
                $scope.connectionError = true;
            });
        }

        //Call the above once on load to populate top stories
        $scope.refreshNews();


        //Save the selected story to var and localstorage
        $scope.saveStory = function(index) {
            $scope.savedNews.articles = $scope.savedNews.articles.concat($scope.news.articles[index]);
            localStorage.setItem('savedNews', angular.toJson($scope.savedNews.articles));
        }

		//Delete the selected story from var and localstorage
        $scope.deleteStory = function(index) {
            $scope.savedNews.articles.splice(index, 1);
            localStorage.setItem('savedNews', angular.toJson($scope.savedNews.articles));
        }

        //Update the region and refresh the news
        //Todo add an apply button
        $scope.saveRegion = function() {
            localStorage.setItem('region', angular.toJson($scope.region));
            $scope.refreshNews();
        }


        // Paging functionality below vars used with Boostrap pagination
        $scope.paging = function() {

            $scope.totalItems = $scope.news.articles.length;
            $scope.numPages = $scope.totalItems / $scope.itemsPerPage;

            if ($scope.totalItems > $scope.itemsPerPage) {
                $scope.pager = true;
            }

            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }

        }

    });
