/*global module:false*/
module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json'),
        bannerFormat = '/**\n' +
            ' * @license <%= pkg.name %> v<%= pkg.version %>, ' +
            '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
            ' * (c) 2013 <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n';

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        jshint: {
            files: ['Gruntfile.js', 'src/ng-iscroll.js']
        },

        concat: {
            options: {
                banner: bannerFormat,
                stripBanners: {
                    block: true
                }
            },
            dist: {
                src: ['src/ng-iscroll.js'],
                dest: 'dist/ng-iscroll.js'
            }
        },

        uglify: {
            options: {
                banner: bannerFormat,
                preserveComments: false,
                report: 'min'
            },
            target: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'dist/ng-iscroll.min.js': ['src/ng-iscroll.js']
                }
            }
        }

    });

    // load Plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register tasks.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
