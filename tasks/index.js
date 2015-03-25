'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('iconfont', 'Create icon fonts from several SVG icons.', function () {
        var path = require('path'),
            fs = require('fs'),
            targetName = this.target,
            options = this.options(),
            data = this.data;

        // check for requires config
        if (!data.src) {
            grunt.fail.fatal('Need src property in "iconfont:' + targetName + '" task!');
        } else {
            data.src = path.normalize(data.src);
        }
        if (!data.dest) {
            grunt.fail.fatal('Need dest property in "iconfont:' + targetName + '" task!');
        } else {
            data.dest = path.normalize(data.dest);
            if (!grunt.file.exists(data.dest)) {
                grunt.file.mkdir(data.dest);
            }
        }

        // load tasks
        grunt.loadNpmTasks('grunt-svgicons2svgfont');
        grunt.loadNpmTasks('grunt-svg2ttf');
        grunt.loadNpmTasks('grunt-ttf2eot');
        grunt.loadNpmTasks('grunt-ttf2woff');

        // make config object for tasks
        var config = {
                svgicons2svgfont: {},
                svg2ttf: {},
                ttf2eot: {},
                ttf2woff: {}
            },
            fontName = options.font || 'iconfont';

        config.svgicons2svgfont[targetName] = {
            options: options,
            src: data.src,
            dest: data.dest
        };
        config.svg2ttf[targetName] = {
            src: path.join(data.dest, fontName + '.svg'),
            dest: data.dest
        };
        config.ttf2eot[targetName] = {
            src: path.join(data.dest, fontName + '.ttf'),
            dest: data.dest
        };
        config.ttf2woff[targetName] = {
            src: path.join(data.dest, fontName + '.ttf'),
            dest: data.dest
        };

        // merge config
        grunt.config.merge(config);

        // run tasks
        grunt.task.run(['svgicons2svgfont:' + targetName]);
        grunt.task.run(['svg2ttf:' + targetName]);
        grunt.task.run(['ttf2eot:' + targetName]);
        grunt.task.run(['ttf2woff:' + targetName]);
    });
};
