module.exports = function(){
	var fs = require('fs');

	/*
	 * Modules are automatically loaded once they are declared
	 * in the control directory.
	 */
	fs.readdirSync(__dirname).forEach(function(file) {
	  if (file != 'index.js' && file.match(/.*.js/)) {
	    var moduleName = file.substr(0, file.indexOf('.'));
	    exports[moduleName] = require('./' + moduleName);
	  }
	});
};

