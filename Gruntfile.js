/*global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            folder: ["dist/*"]
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
            test: {
                src: "test/**/*",
                dest: "dist/"
            }
        },
        push_svn: {
            options: {
                trymkdir: true,
                remove: false
            },
            release: {
                src: "./dist",
                dest: '<%= grunt.config("svnDir") %>/<%= pkg.version %><%= grunt.config("buildNumber") %>',
                tmp: './.build'
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
    grunt.loadNpmTasks("grunt-push-svn");
    grunt.registerTask('deploy', 'deploy to svn', function() {
        grunt.config("svnDir", grunt.option("dir"));
        if (grunt.option("build")) {
            grunt.config("buildNumber", "-" + grunt.option("build"));
        }
        grunt.task.run("push_svn");
    });
    grunt.registerTask('default', ['clean', 'jshint:devel', 'rig']);
    grunt.registerTask('release', ['clean', 'jshint:devel', 'rig', 'uglify', 'copy']);
};