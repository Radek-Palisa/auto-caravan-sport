module.exports = function(grunt) {

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Jade
		 */
		jade: {
		  compile: {
			options: {
			  pretty: true,
			},
			files: {
			    'nabidka.html' : 'jade/nabidka.jade',
				'gallery.html' : 'jade/gallery.jade',
				'index.html' : 'jade/index.jade',
				'kontakt.html' : 'jade/kontakt.jade',
				'ofirme.html' : 'jade/ofirme.jade'
			}
		  }
		},
		
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
		 * Autoprefixer
		 */
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			// prefix all files
			multiple_files: {
				expand: true,
				flatten: true,
				src: '*.css',
				dest: ''
			}
		},
		
	  	/**
	  	 * Watch
	  	 */
		watch: {
			options: { livereload: true},
			jade: {
				files: 'jade/**/*.jade',
				tasks: ['jade']
			},
			css: {
				files: 'sass/**/*.{scss,sass}',
				tasks: ['sass', 'autoprefixer']
			}, //css
			html: {
				files: '*.html',
			}
		}, // watch

	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.registerTask('default','Convert Jade templates into html templates',['jade','watch']);
}