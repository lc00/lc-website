var bowerJsFiles = [
	'bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js'
	];
var bowerCssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css'
];

var allDevJsFiles = bowerJsFiles.concat(['client/dev/scripts/**/*.js'
]);
var allDevCssFiles = bowerCssFiles.concat([
	'client/dev/**/*.css'
]);


module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			// gruntfile is a sub-task of watch
			gruntfile: {
				// '**/' means search up to any number of directories
				files: ['Gruntfile.js'],
				// perform jshint on Gruntfile.js, inject stuff to index.html
				tasks: [
					'jshint:gruntfile',
					'sails-linker:dev-bower-JS',
					'sails-linker:dev-local-JS',
					'sails-linker:dev-bower-CSS',
					'sails-linker:dev-local-CSS'
				],
				options: {
					spawn: false,
				}
			},
			// client is a sub-task of watch
			client: {
				files: [
					'client/dev/scripts/**/*.js',
					'client/dev/styles/**/*.css'
				],
				tasks: [
					'jshint:client',
					'sails-linker:dev-local-JS',
					'sails-linker:dev-local-CSS'
				],
				options: {
					spawn: false
				}
			},
			// clientTests: {
			// 	files: ['client/dev/tests/**/*.js'],
			// 	tasks: ['jshint:clientTests'],
			// 	options: {
			// 		spawn: false
			// 	}
			// },	
			// server is a sub-task of watch
			server: {
				files: [
					'server/**/*.js'
			  ],
				// perform jshint on all the .js files under server
				//restart server under dev environment
				tasks: [
					'jshint:server',
				  'express:dev'
				],
				options: {
					spawn: false,
				}
			}
			// serverTests: {
			// 	files: ['server/tests/**/*.js'],
			// 	tasks: [
			// 		'jshint:serverTests',
			// 		'express:dev'
			// 	],
			// 	options: {
			// 		spawn: false
			// 	},
			// }
		},
		jshint: {
			all: ['Gruntfile.js', 'client/dev/**/*.js', 'server/**/*.js'],
			gruntfile: ['Gruntfile.js'],
			client: ['client/dev/**/*.js'],
			// clientTests: ['client/dev/tests/**/*.js'],
			server: ['server/**/*.js']
			// serverTests: ['server/tests/**/*.js']
		},
		// sails-linker injects html tags 
		'sails-linker': {
			'dev-bower-JS': {
				options: {
					startTag: '<!-- START BOWER JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					// '/lib' is bower_components
					fileTmpl: '<script src="/lib%s"></script>',
					appRoot: 'bower_components'
				},
				files: {
					'client/dev/index.html': bowerJsFiles
				}
			},
			'dev-local-JS': {
				options: {
					startTag: '<!-- START LOCAL JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="%s"></script>',
					appRoot: 'client/dev'
				},
				files: {
					'client/dev/index.html': ['client/dev/scripts/**/*.js']
				}
			},
			'dev-bower-CSS': {
				options: {
					startTag: '<!-- START BOWER CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="/lib%s"></link>',
					appRoot: 'bower_components'
				},
				files: {
					'client/dev/index.html': bowerCssFiles
				}
			},
			'dev-local-CSS': {
				options: {
				startTag: '<!-- START LOCAL CSS INJECT -->',
				endTag: '<!-- END INJECT -->',
				fileTmpl: '<link rel="stylesheet" type="text/css" href="%s"></link>',
				appRoot: 'client/dev'
				},
				files: {
					'client/dev/index.html': ['client/dev/styles/**/*.css']
				}
			},


			'prod-local-JS': {
				options: {
					startTag: '<!-- START LOCAL JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="%s"></script>',
					appRoot: 'client/prod'
				},
				files: {
					'client/prod/index.html': ['client/prod/scripts/threePages.min.js']
				}
			},
			'prod-local-CSS': {
				options: {
					startTag: '<!-- START LOCAL CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="%s"></link>',
					appRoot: 'client/prod'
				},
				files: {
					'client/prod/index.html': ['client/prod/styles/threePages.min.css']
				}
			},
			'prod-bower-JS': {
				options: {
					startTag: '<!-- START BOWER JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="/lib%s"></script>',
					appRoot: 'bower_components'
				},
				files: {
					'client/prod/index.html': []
				}
			},
			'prod-bower-CSS': {
				options: {
					startTag: '<!-- START BOWER CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="/lib%s"></link>',
					appRoot: 'bower_components'
				},
				files: {
					'client/prod/index.html': []
				}
			},
		},
		uglify: {
			prod: {
				files: {
					'client/prod/scripts/threePages.min.js': allDevJsFiles
				},
				options: {
					mangle: false
				}
			}
		},
		cssmin: {
			prod: {
				files: {
					'client/prod/styles/threePages.min.css': allDevCssFiles
				}
			}
		},
		copy: {
			prod: {
				files: [
				//cwd: common working directory
					{expand: true, cwd: 'client/dev', src: ["images/**", 'views/**', 'index.html'], dest: "client/prod/"}
				] 
			}
		},
		env: {
			options: {},
			dev: {
				PORT: 8000,
				CLIENT_DIR: 'dev'
			},
			prod: {
				PORT: 6500,
				CLIENT_DIR: 'prod',
			}
		},
		express: {
			dev: {
				options: {
					script: 'server/app.js',
					output: 'this app is listening at http://localhost/8000'
				}
			},
			prod: {
				options: {
					script: 'server/app.js',
					output: 'this app is listening at port number 6500',
					// keeps this sub-task/server running; therefore, express.prod is the last task
					// in the lineup for 'grunt prod'
					background: false
				}
			}

		}
	});

	// equivalent to require in grunt
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sails-linker');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev', ['env:dev','sails-linker:dev-bower-JS', 'sails-linker:dev-local-JS', 'sails-linker:dev-bower-CSS','sails-linker:dev-local-CSS', 'express:dev', 'watch']);
	grunt.registerTask('prod', ['env:prod', 'uglify', 'cssmin', 'copy', 'sails-linker:prod-local-JS', 'sails-linker:prod-local-CSS', 'sails-linker:prod-bower-JS', 'sails-linker:prod-bower-CSS', 'express:prod']);
};