/*global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build: 'build/<%= grunt.config("dirname") %><%= pkg.version %><%= grunt.config("buildNumber") %>/',
        clean: {
            folder: ["dist/*", "build/*"]
        },
        meta: {
            version: 'MTVNPlayer.require("<%= pkg.name %>").version = "<%= pkg.version %><%= grunt.config("buildNumber") %>";',
            buildDate: 'MTVNPlayer.require("<%= pkg.name %>").build = "<%= grunt.template.today("mm/dd/yyyy hh:MM:ss TT") %>";'
        },
        uglify: {
            all: {
                files: {
                    "dist/mtvn-util.min.js": "dist/mtvn-util.js"
                }
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
                    asi: false,
                    browser: true,
                    devel: true,
                    debug: true
                },
                src: ['src/*.js']
            },
            release: {
                options: {
                    browser: true
                },
                src: ['src/*.js']
            }
        },
        rig: {
            options: {
                footer: '\n<%=meta.version%>\n<%=meta.buildDate%>'
            },
            devel: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        bump: {
            files: ['package.json', 'bower.json']
        },
        testem: {
            options: {
                "framework": "qunit"
            },
            all: {
                src: ['test/qunit/test.html'],
                dest: 'tests.tap'
            }
        },
        copy: {
            build: {
                src: "dist/**/*",
                dest: "<%=build%>",
                flatten: true,
                expand: true

            }
        },
        watch: {
            files: ['grunt.js', 'src/*.*'],
            tasks: ['default']
        }
    });
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bumpx');
    grunt.loadNpmTasks('grunt-testem');
    grunt.registerTask('remove-globals', 'clean up', function() {
        var globals = /\/\*global.*\*\//gi,
            target = "dist/mtvn-util.js";
        grunt.file.write(target, grunt.file.read(target).replace(globals, ""));
    });
    grunt.registerTask('dirname', 'set a subdirectory name, result will be build/subdirectory(s)', function(dir) {
        if (dir.lastIndexOf("/") !== dir.length - 1) {
            dir += "/";
        }
        grunt.config("dirname", dir);
    });
    grunt.registerTask('buildNumber', 'append a build number to the build', function(buildNumber) {
        grunt.config("buildNumber", "-" + buildNumber);
    });
    grunt.registerTask('default', ['clean', 'jshint:devel', 'rig']);
    grunt.registerTask('release', ['clean', 'jshint:devel', 'rig', 'uglify', 'copy']);
};