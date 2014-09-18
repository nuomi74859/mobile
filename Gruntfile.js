/**
 * Created by nuomi on 14-7-31.
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                report:'min',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.js',
                    dest:''
                }]
            }
        },
//        sass: {
//            options: {
//                style:'compressed'
//            },
//            dist: {
//                files:[{
//                    expand:true,
//                    cwd:'src',
//                    src:'**/*.scss',
//                    dest:'',
//                    ext:'.css'
//                }]
//            }
//        },
        compass: {
            options: {
                sassDir:'src/sass',
                cssDir:'css',
                imagesDir:'images',
                outputStyle:'compressed',
                assetCacheBuster:false
            },
            dist: {
                files:[{
                    expand:true,
                    src:'**/*.scss'
                }]
            }
        },
        htmlmin: {
            options: {
                removeComments:true,
                collapseWhitespace:true
            },
            dist: {
                files:[{
                    expand:true,
                    cwd:'src',
                    src:'**/*.html',
                    dest:''
                }]
            }
        },
        imagemin: {
            options: {
                optimizationLevel:3
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:['**/*.{png,jpg,jpeg}'],
                    dest:''
                }]
            }

        },
        connect: {
            options: {
                port:8000,
                hostname:'172.31.15.104',
                debug:true,
//                keepalive:true,
                livereload:3000
            },
            server: {
                options: {
                    open:true,
                    base:''
                }
            }
        },
        watch: {
            uglify: {
                files:['src/**/*.js'],
                tasks:['uglify']
            },
            compass: {
                files:['src/**/*.scss'],
                tasks:['compass']
            },
            htmlmin: {
                files:['src/**/*.html'],
                tasks:['htmlmin']
            },
            livereload: {
                options: {
                    livereload:'<%=connect.options.livereload%>'
                },
                files: [
                    '*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js'
                ]
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-sass');
//    grunt.loadNpmTasks('grunt-contrib-compass');
//    grunt.loadNpmTasks('grunt-contrib-htmlmin');
//    grunt.loadNpmTasks('grunt-contrib-imagemin');
//    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['uglify','compass','htmlmin','imagemin']);
    grunt.registerTask('server',['connect','watch']);
};