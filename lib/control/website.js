//**********************************************************************************************
//                                        website.js
//
// Author(s): Clément Férey
// Creation date: August 2015
// Contact: clement.ferey@gmail.com
// Description: Controller for the general requests done on the website

//**********************************************************************************************

var winston = require('winston');
var secret = require('../../config/secret.js');
yaml = require('js-yaml');
fs = require('fs');

// Get data, or throw exception on error 
try {
	var formations = yaml.safeLoad(fs.readFileSync(__base + 'lib/model/formations.yml', 'utf8'));
} catch (e) {
	console.log(e);
}
try {
	var projects = yaml.safeLoad(fs.readFileSync(__base + 'lib/model/projects.yml', 'utf8'));
} catch (e) {
	console.log(e);
}



/**
 * [home handle a request made for the home page]
 * @param  {[type]} req [request object]
 * @param  {[type]} res [result object]
 * @return {[type]}     html content of the homepage
 */
exports.home = function(req, res) {
	res.render('home');
};


/**
 * [projects handle a request made for the various projects pages]
 * @param  {[type]} req [request object]
 * @param  {[type]} res [result object]
 * @return {[type]}     html content of the homepage
 */
exports.projects = function(req, res) {
	//Verifier entier
	var project = projects[req.params.id];
	res.render('projects', {
		data: project
	});

};

/**
 * [formations handle a request made for the various formations page]
 * @param  {[type]} req [request object]
 * @param  {[type]} res [result object]
 * @return {[type]}     html content of the homepage
 */
exports.formations = function(req, res) {
	res.render('formations');
};

/**
 * [experiences handle a request made for the various experiences page]
 * @param  {[type]} req [request object]
 * @param  {[type]} res [result object]
 * @return {[type]}     html content of the homepage
 */
exports.experiences = function(req, res) {
	res.render('experiences');
};

exports.contact = function(req, res) {
	var email = req.body.email;
	var msg = req.body.msg;
	var name = req.body.name;

	var sendgrid = require('sendgrid')(secret.sendgrid.token);
	sendgrid.send({
		to: 'clement.ferey@gmail.com',
		from: 'noreply@clementferey.fr',
		subject: 'Nouveau contact sur ton site perso',
		text: 'Nom : ' + name + '\nEmail : ' + email + '\nMessage : ' + msg 
	}, function(err, json) {
		if (err) {
			res.json({'error' : err});
		}
		res.json(json);
	});
	res.json({message:'success'});
};