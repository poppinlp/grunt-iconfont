'use strict';

module.exports = function(grunt) {
    grunt.config.init({
        iconfont: {
            dist: {
                options: {
                    font: 'test'
                },
                src: 'tests/icons1/*.svg',
                dest: 'tests/font/font1/'
            },
            test: {
                options: {
                },
                src: 'tests/icons2/*.svg',
                dest: 'tests/font/font2/'
            }
        }
    });

    grunt.loadTasks('tasks/');

    grunt.registerTask('test', ['iconfont']);
};
