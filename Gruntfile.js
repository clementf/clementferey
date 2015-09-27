module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cafemocha: {
			all: {
				src: 'test/tests-*.js',
				options: {
					ui: 'tdd'
				},
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/website.css': 'public/sass/main.scss',
				}

			}
		},
		cssmin: {
			target: {
				files: {
					'public/css/website.min.css': 'public/css/website.css',
				}
			}
		},
		jshint: {
			options: {
				browser: true,
				devel: true,
			},
			app: ['index.js', 'public/js/script.js', 'lib/**/*.js', '!**/*min.js', '!public/js/app/bower_components/**/*.js'],
			qa: ['Gruntfile.js'],
		},
		nodemon: {
			dev: {
				script: './index.js'
			}
		},
		uglify: {
			my_target:{
				files: {
					'public/js/script.min.js': ['public/js/script.js']
				}
			}
			

		},
		watch: {
			js: {
				files: ['lib/**/*.js', 'lib/**/*.yml', 'public/js/script.js', 'index.js', 'test/tests-*.js', '!**/min.*'],
				tasks: ['cafemocha', 'jshint', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['public/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false
				}
			},
		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});
	grunt.registerTask('default', ['concurrent']);
};