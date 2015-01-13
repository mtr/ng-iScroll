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

        clean: ['dist'],

        js: {
            src: 'src/ng-iscroll.js',
            dest: 'dist/ng-iscroll.js',
            minDest: 'dist/ng-iscroll.min.js'
        },

        jshint: {
            files: ['Gruntfile.js', '<%= js.src %>']
        },

        concat: {
            options: {
                banner: bannerFormat,
                stripBanners: {
                    block: true
                }
            },
            dist: {
                src: ['<%= js.src %>'],
                dest: '<%= js.dest %>'
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
                    '<%= js.minDest %>': ['<%= js.src %>']
                }
            }
        },

        watch: {
            js: {
                files: '<%= js.src %>',
                tasks: ['clean', 'jshint', 'concat', 'uglify']
            }
        }

    });

    // load Plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register tasks.
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('development', ['default', 'watch']);
};
