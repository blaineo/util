/*global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            folder: ["dist/*", "build/*"]
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
        uglify: {
            all: {
                src: "dist/<%=pkg.name%>.js",
                dest: "dist/<%=pkg.name%>.min.js"
            }
        },
        rig: {
            all: {
                src: ['src/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        copy: {
            build: {
                src: "dist/**/*",
                dest: 'build/<%= grunt.config("dirname") %><%= pkg.version %><%= grunt.config("buildNumber") %>/',
                flatten: true,
                expand: true
            }
        },
        testem: {
            all: {
                options: {
                    launch_in_ci: ['safari', 'chrome', 'firefox'],
                    framework: "qunit"
                },
                src: ['test/qunit/test.html']
            }
        },
        bump: {
            files: ['package.json', 'bower.json']
        },
        watch: {
            files: ['Gruntfile.js', 'src/<%=pkg.name%>.js'],
            tasks: ["default"]
        }
    });
    grunt.registerTask('dirname', 'run before release task: set a subdirectory name, result will be build/subdirectory(s)', function(dir) {
        grunt.config("dirname", dir.lastIndexOf("/") !== dir.length - 1 ? dir + "/" : dir);
    });
    grunt.registerTask('buildNumber', 'run before release task: append a build number to the build', function(buildNumber) {
        grunt.config("buildNumber", "-" + buildNumber);
    });
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bumpx');
    grunt.loadNpmTasks('grunt-testem');
    grunt.registerTask('default', ['clean', 'jshint:devel', 'rig']);
    grunt.registerTask('release', ['clean', 'jshint:release', 'rig', 'uglify', 'copy']);
};