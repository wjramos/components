'use strict';

var gulp = require( 'gulp' );
var path = require( 'path' );
var febs = require( 'febs' );

var OUT_PATH = path.join( febs.config.paths.OUT_ROOT, 'component-utils' );

gulp.task( 'default', [
    febs.addTask.compileJs( __dirname, OUT_PATH, {
        es6: true
    } )
] );

febs.addTask.jshint();
febs.addTask.test();