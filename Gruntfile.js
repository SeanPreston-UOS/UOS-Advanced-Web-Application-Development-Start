module.exports = function (grunt) {
    const sass = require('node-sass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            main: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed',
                    implementation: sass,
                },
                files: {
                    './styles/styles.min.css': './scss/main.scss'
                }
            },
        },
        uglify: {
            main: {
                "options": {
                    "sourceMap": false,
                    "compress": true,
                    "mangle": false,
                },
                "files": {
                    "./scripts/scripts.min.js": [
                        "./node_modules/jquery/dist/jquery.min.js",
                        "./node_modules/popper.js/dist/umd/popper.min.js",
                        "./node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "./node_modules/slick-carousel/slick/slick.min.js",
                        "./js/**/*.js"
                    ]
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            watchall: {
                tasks: [
                    'watch:scss',
                    'watch:js'
                ]
            }
        },
        watch: {
            scss: {
                files: ['./scss/**/*.scss'],
                tasks: ['sass:main', 'ftp_push:css'],
                options: {
                    spawn: false,
                },
            },
            js: {
                files: ['./js/**/*.js'],
                tasks: ['uglify:main', 'ftp_push:js'],
                options: {
                    spawn: false,
                },
            },
        },
        ftp_push: {
            js: {
                options: {
                    authKey: "serverA",
                    host: "ftp.YOUR_USERNAME.suffolkweb.co.uk",
                    dest: "/public_html/MODULE_DIR/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            "./scripts/*.js"
                        ]
                    }
                ]
            },
            css: {
                options: {
                    authKey: "serverA",
                    host: "ftp.YOUR_USERNAME.suffolkweb.co.uk",
                    dest: "/public_html/MODULE_DIR/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            "./styles/*.css"
                        ]
                    }
                ]
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ftp-push');

    grunt.registerTask('default', ['concurrent:watchall']);
};
