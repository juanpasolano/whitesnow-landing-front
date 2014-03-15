module.exports =  function(grunt){

	grunt.initConfig({

		watch:{
			less:{
				files:['www/css/less/*.less'],
				tasks:['less', 'notify:less']
			}
		},

		less:{
			dist:{
				options: {
					paths: ["www/css", "www/css/less"]
				},
				files: {
					'www/css/peep.css': 'www/css/less/peep.less'
				}
			}
		},

		notify:{
			less:{
				options:{
					message: 'LESS files compiled'
				}
			},
		}

});


grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-notify');


grunt.registerTask('default', ['watch']);
grunt.registerTask('watch-less', ['watch:less']);

};
