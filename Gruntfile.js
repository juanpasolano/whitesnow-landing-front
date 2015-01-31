module.exports =  function(grunt){

	grunt.initConfig({

		watch:{
            js_app: {
                files: ['www/js/app/**/*.js','www/js/app/*.js'],
                tasks: ['concat:js']
            },
			less:{
				files:['www/css/less/*.less'],
				tasks:['less']
			}
		},


        concat: {
            js: {
                src: ['www/js/app/**/*.js','www/js/app/*.js'],
                dest: 'www/js/dist/built.js'
            }
        },

		less:{
			dist:{
				options: {
					paths: ["www/css", "www/css/less"]
				},
				files: {
					'www/css/main.css': 'www/css/less/main.less'
				}
			}
		},

		notify:{
			less:{
				options:{
					message: 'LESS files compiled'
				}
			},
            js:{
                options:{
                    message: 'JS files compiled'
                }
            }
		}

});


grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-notify');


grunt.registerTask('default', ['watch']);
grunt.registerTask('watch-less', ['watch:less']);

};
