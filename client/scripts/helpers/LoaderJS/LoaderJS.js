let scriptLink = 'client/scripts/';
let typeElement = 'script';

var LoaderJS = (function () {

	function loadPaths(paths, fnCreateSrcPath) {
		for (var i = 0; i < paths.length; i++) {
			var imported = document.createElement(typeElement);
			imported.src = fnCreateSrcPath(paths[i]);
			document.head.appendChild(imported);
		}
	}

	return{
		loadScriptJSPaths: function(paths) {
			function createSrcPath(path) {
				return scriptLink.concat(path);				
			}

			loadPaths(paths, createSrcPath);
		},

		loadScriptJSDirectPaths: function(paths) {
			function createSrcPath(path) {
				return path;
			}

			loadPaths(paths, createSrcPath);
		}
	};
})();