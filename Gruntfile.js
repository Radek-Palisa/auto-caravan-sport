module.exports = function(grunt) {

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Sass
		 */
		sass: {
		  dev: {
		    options: {
		      style: 'expanded',
		      sourcemap: 'none',
		    },
		    files: {
		      'style.css': 'sass/main.scss'
		    }
		  },
			
		  dist: {
			options: {
			  style: 'compressed',
			  sourcemap: 'none',
			},
			files: {
			  'style-min.css': 'sass/main.scss'
			}
		  }			
		},

	  	/**
	  	 * Watch
	  	 */
		watch: {
			options: { livereload: true},
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}, //css
			html: {
				files: '*.html',
			}
		}, // watch

	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}