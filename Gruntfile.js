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

        js: {
            src: 'src/ng-iscroll.js',
            annotated: 'src/ng-iscroll.annotated.js',
            dest: 'dist/ng-iscroll.js',
            minDest: 'dist/ng-iscroll.min.js'
        },

        clean: [
            'dist',
            '<%= src.annotated =>'
        ],

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            target: {
                files: [
                    {
                        expand: true,
                        src: ['<%= js.src %>'],
                        ext: '.annotated.js',
                        extDot: 'last'
                    }
                ]
            }
        },

        concat: {
            options: {
                banner: bannerFormat +
                ";(function (window, undefined){\n",
                footer: "}(window));",
                stripBanners: {
                    block: true
                }
            },
            dist: {
                src: ['<%= js.annotated %>'],
                dest: '<%= js.dest %>'
            }
        },

        jshint: {
            files: ['Gruntfile.js', '<%= js.dest %>']
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
                    '<%= js.minDest %>': ['<%= js.dest %>']
                }
            }
        },

        watch: {
            js: {
                files: '<%= js.src %>',
                tasks: [
                    'clean',
                    'ngAnnotate',
                    'concat',
                    'jshint',
                    'uglify'
                ]
            }
        }

    });

    // load Plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Register tasks.
    grunt.registerTask('default', [
        'clean',
        'ngAnnotate',
        'concat',
        'jshint',
        'uglify'
    ]);
    grunt.registerTask('development', ['default', 'watch']);
};
