module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %>\n* Copyright (c) Viacom <%= grunt.template.today("yyyy") %> */'
        },
        clean: {
            folder: ["dist/*", "build/*"]
        },
        lint: {
            devel: ['grunt.js', 'src/*.js'],
            release: ['grunt.js', 'src/*.js']
        },
        min: {
            dist: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js"
            }
        },
        removelogging: {
            dist: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.js"
            }
        },
        jshint: {
            devel: {
                options: {
                    browser: true,
                    devel: true,
                    debug: true
                }
            },
            release: {
                options: {
                    browser: true
                }
            }
        },
        rig: {
            devel: {
                src: ['<banner:meta.banner>', 'src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        watch: {
            files: ['grunt.js', 'src/*.*'],
            tasks: 'default'
        }
    });
    grunt.registerTask('ender', 'build ender js', function() {
        // this is the ender.js used for testing the playlist metadata as a standalone component.
        var done = this.async();
        require("ender").build(Object.keys(grunt.config("pkg").dependencies), {
            output: "test/js/ender"
        }, function() {
            done(true);
        });
    });
    grunt.registerTask('default', 'clean lint:devel rig');
    grunt.registerTask('release', 'clean lint:release rig removelogging min');
};