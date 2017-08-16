// Configurations
var pkgjson = require('./package.json');
var config = {
  pkg      : pkgjson,
  directory: {
    vendor: './src/vendor',
    src   : './src',
    dist  : './dist'
  }
};
var module;

// Grunt
module.exports = function (grunt) {
  'use strict';

  // Configurations
  var gruntConfig = grunt.file.readJSON('./src/grunt/config.json', { encoding: 'utf8' });

  // Setup
  grunt.initConfig({
    config: config,
    pkg   : config.pkg,

    clean: {
      css: '<%= config.directory.dist %>/css',
      js : '<%= config.directory.dist %>/js'
    },

    less: {
      app: {
        options: {
          strictMath       : true,
          sourceMap        : true,
          outputSourceFiles: true,
          sourceMapURL     : '<%= config.directory.dist %>/css/stylesheet.css.map',
          sourceMapFilename: '<%= config.directory.dist %>/css/stylesheet.css.map'
        },
        src    : '<%= config.directory.src %>/less/stylesheet.less',
        dest   : '<%= config.directory.dist %>/css/stylesheet.css'
      },
      ie9: {
        options: {
          strictMath       : true,
          outputSourceFiles: true
        },
        src    : '<%= config.directory.src %>/less/stylesheet.less',
        dest   : '<%= config.directory.dist %>/css/stylesheet-ie9.css'
      }
    },

    csslint: {
      options: {
        csslintrc: '<%= config.directory.src %>/less/.csslintrc'
      },
      app    : [
        '<%= config.directory.dist %>/css/stylesheet.css'
      ]
    },

    autoprefixer: {
      app    : {
        options: {
          map: true,
          browsers: gruntConfig.autoprefixer.browsers.other
        },
        src    : '<%= config.directory.dist %>/css/stylesheet.css'
      },
      ie9: {
        options: {
          map: true,
          browsers: gruntConfig.autoprefixer.browsers.ie9
        },
        src    : '<%= config.directory.dist %>/css/stylesheet-ie9.css'
      }

    },

    sakugawa: {
      ie9: {
        options: {
          maxSelectors: 4095,
          mediaQueries: 'separate',
          suffix: '-'
        },
        src: ['<%= config.directory.dist %>/css/stylesheet-ie9.css']
      }
    },

    modernizr: {
      app: {
        devFile      : 'remote',
        parseFiles   : true,
        files        : {
          src: ['<%= config.directory.dist %>/js/app.js', '<%= config.directory.dist %>/js/ie9.js', '<%= config.directory.dist %>/css/stylesheet.css']
        },
        outputFile   : '<%= config.directory.dist %>/js/modernizr.js',
      }
    },

    jshint: {
      options: {
        jshintrc: '<%= config.directory.src %>/js/.jshintrc'
      },
      app    : {
        src: ['<%= config.directory.src %>/js/*.js']
      }
    },

    jscs: {
      options: {
        config: '<%= config.directory.src %>/js/.jscsrc'
      },
      app    : {
        src: '<%= jshint.app.src %>'
      }
    },

    concat: {
      options: {
        sourceMap   : true,
        stripBanners: true
      },
      app     : {
        src : gruntConfig.concat.jsApp,
        dest: '<%= config.directory.dist %>/js/app.js'
      },
      ie9     : {
        src : gruntConfig.concat.jsIe9,
        dest: '<%= config.directory.dist %>/js/ie9.js'
      }
    },

    copy: {
      src : {
        files: [
          {
            expand: true,
            cwd   : '<%= config.directory.vendor %>/bootstrap/less/',
            src   : '**/*',
            dest  : '<%= config.directory.src %>/less/vendor/bootstrap/'
          },
          {
            expand: true,
            cwd   : '<%= config.directory.vendor %>/fontawesome/less/',
            src   : '**/*',
            dest  : '<%= config.directory.src %>/less/vendor/fontawesome/'
          },
          {
            expand: true,
            cwd   : '<%= config.directory.vendor %>/bs3-designer/less/',
            src   : '**/*',
            dest  : '<%= config.directory.src %>/less/vendor/bs3-designer/'
          },
          {
            expand: true,
            cwd   : '<%= config.directory.vendor %>/bs3-masonry/less/',
            src   : '**/*',
            dest  : '<%= config.directory.src %>/less/vendor/bs3-masonry/'
          }
        ]
      },
      dist: {
        files: [
          {
            expand : true,
            flatten: true,
            cwd    : '<%= config.directory.vendor %>/fontawesome/',
            src    : '**/fonts/*',
            dest   : '<%= config.directory.dist %>/fonts/'
          }
        ]
      }
    },

    watch: {
      less: {
        files: ['<%= config.directory.src %>/less/**/*.less'],
        tasks: ['clean:css', 'less', 'autoprefixer', 'sakugawa', 'modernizr']
      },
      js  : {
        files: '<%= config.directory.src %>/js/**/*.js',
        tasks: ['clean:js', 'concat', 'modernizr']
      }
    }
  });

  // Load
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sakugawa');

  // Register
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('build', ['clean', 'concat', 'less', 'autoprefixer', 'modernizr', 'sakugawa']);
  grunt.registerTask('build-css', ['clean:css', 'less', 'autoprefixer', 'modernizr', 'sakugawa']);
  grunt.registerTask('build-js', ['clean:js', 'concat', 'modernizr']);

  grunt.registerTask('test', ['clean', 'concat', 'jscs', 'jshint', 'less', 'autoprefixer', 'csslint', 'modernizr', 'sakugawa']);
  grunt.registerTask('test-css', ['clean:css', 'less', 'autoprefixer', 'csslint', 'modernizr', 'sakugawa']);
  grunt.registerTask('test-js', ['clean:js', 'concat', 'jscs', 'jshint', 'modernizr']);

  grunt.registerTask('copy-files', ['copy']);
};
