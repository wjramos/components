var path = require( 'path' );
var febs = require( 'febs' );
var gulp = require( 'gulp' );

var OUT_PATH = path.join( febs.config.paths.OUT_ROOT, 'sitewide-overlay' );

gulp.task( 'default', [
    febs.addTask.compileLess( __dirname, OUT_PATH, {
        version: false
    } )
] );
