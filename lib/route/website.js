var website = require('../control/website.js');

module.exports = function(app){	
	//Home page
	app.get('\/:lang?\/',website.home);

	//Projects pages
	app.get('\/:lang?\/projects\/:id\/*', website.projects);

	//Formations and experiences pages
	app.get('\/:lang?\/formations/:id/*', website.formations);

	//Experiences pages
	app.get('\/:lang?\/experiences/:id/*', website.experiences);

	//Contact form
	app.post('\/contact/', website.contact);
};
