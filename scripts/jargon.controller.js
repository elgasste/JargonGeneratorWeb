'use strict';

(function(angular) {
    angular.module('jargon').controller('jargonController', ['$scope', '$location', '$timeout', 'jargonTypes', function ($scope, $location, $timeout, jargonTypes) {

        var jargonTypeParam = $location.url().replace(/\//g, '');
        var initialJargonType = null;
        for (var key in jargonTypes) {
            if ( key.toUpperCase() === jargonTypeParam.toUpperCase()) {
                initialJargonType = key;
                break;
            }
            else if (initialJargonType === null) {
                initialJargonType = key;
            }
        }

        $scope.jargonOutput = '';
        $scope.copiedMessage = '';
        $scope.jargonTypes = jargonTypes;
        $scope.selectedType = initialJargonType;

        var wordCache = [];
        var copier = document.querySelector('.copymachine');

        var getDistinctWord = function(poolIndex) {
            var words = jargonTypes[$scope.selectedType].wordPool[poolIndex];
            var wordIndex = Math.floor(Math.random() * words.length);
            var word = words[wordIndex];
            while (wordCache.indexOf(word) > -1) {
                wordIndex++;
                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
                word = words[wordIndex];
            }
            wordCache.push(word);
            return word;
        };

        $scope.selectType = function(newType) {
            if (newType != $scope.selectedType) {
                $scope.jargonOutput = '';
                $scope.selectedType = newType;
            }
        };

        $scope.generateJargon = function() {
            wordCache = [];
            var constructIndex = Math.floor(Math.random() * jargonTypes[$scope.selectedType].constructs.length);
            var sentence = jargonTypes[$scope.selectedType].constructs[constructIndex];

            for (var i = 0; i < jargonTypes[$scope.selectedType].wordPool.length; i++) {
                var searchKey = '{' + i + '}';
                while (sentence.indexOf(searchKey) > -1) {
                    sentence = sentence.replace(searchKey, getDistinctWord(i));
                }
            }

            $scope.jargonOutput = sentence;
        };

        var showCopySuccess = function() {
            $scope.copiedMessage = 'copied it!';
            $timeout(function() {
                $scope.copiedMessage = '';
            }, 2000);
        };

        $scope.copyJargon = function() {
            copier.innerHTML = $scope.jargonOutput;
            copier.select();
            try {
                document.execCommand('Copy');
                showCopySuccess();
            } catch (error) {
                console.log('got this error:');
                console.log(error);
                alert('Couldn\'t copy the jargon, it may not be supported in your browser!');
            }
        };

    }]);
})(angular);