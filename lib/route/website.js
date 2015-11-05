var website = require('../control/website.js');
var express = require('express');
var winston = require('winston');

module.exports = function(app) {

	var langs = ['en', ''];

	//Home page
	app.get('\/:lang?\/', website.home);

	//Projects pages
	app.get('\/:lang?\/projects\/:id\/*', website.projects);

	//Formations and experiences pages
	app.get('\/:lang?\/formations\/:id\/*', website.formations);

	//Experiences pages
	app.get('\/:lang?\/experiences\/:id\/*', website.experiences);

	//Contact form
	app.post('\/contact/', website.contact);

	//Check the langs
	app.param('lang', function(req, res, next, lang) {
		if (langs.indexOf(lang) > -1)
			next();
		else {
			badAnswer(res);
		}
	});

	//Handle 404
	app.get('*', function(req, res) {
		badAnswer(res);
	});

};

var badAnswer = function(res) {
	res.status(404);
	res.render('404.handlebars', {
		seo: {
			title: 'Woops, I couldn\'t complete your request, sorry.'
		}
	});
};