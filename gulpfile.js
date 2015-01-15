var gulp = require('gulp')
var usemin = require('gulp-usemin')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var minifyCss = require('gulp-minify-css')
var minifyJs = require('gulp-uglify')
var concat = require('gulp-concat')
var less = require('gulp-less')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate')
//var minifyHTML = require('gulp-minify-html')

var paths = {
    scripts: 'src/scripts/**/*.*',
    styles: 'src/less/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    fonts: 'src/fonts/**.*',
    bower_fonts: 'src/vendor/**/*.{ttf,woff,eof,svg}',
    dist: './'
}

var app = {
    js: paths.dist + 'js/*.js',
    css: paths.dist + 'css/*.css',
    html: [
        paths.dist + 'index.html',
        paths.dist + 'templates/*.html'
    ]
}

/**
 * Copy fonts to dist directory
 */
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist + 'fonts'))
})

/**
* Compile less
*/
gulp.task('less', function() {
    return gulp.src(paths.styles)
    .pipe(less())
    .pipe(concat('hackapp.css'))
    .pipe(gulp.dest(paths.dist + 'css'))
})

/**
 * Minify css
 */
gulp.task('css', ['less'], function() {
    return gulp.src('css/hackapp.css')
    .pipe(minifyCss())
    .pipe(concat('hackapp.min.css'))
    .pipe(gulp.dest(paths.dist + 'css'))
})

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
    .pipe(usemin({
        js: [minifyJs(), 'concat'],
        css: [minifyCss(), 'concat']
    }))
    .pipe(gulp.dest(paths.dist))
})

/**
 * Copy assets
 */
gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
    .pipe(rename({
        dirname: '/fonts'
    }))
    .pipe(gulp.dest(paths.dist + 'lib'))
})

/**
 * Handle custom files
 */
gulp.task('js', function() {
    return gulp.src(paths.scripts)
    //.pipe(minifyJs())
    .pipe(ngAnnotate({
        add: true,
        single_quotes: true
    }))
    .pipe(concat('hackapp.js'))
    .pipe(gulp.dest(paths.dist + 'js'))
})

gulp.task('templates', function() {
    return gulp.src(paths.templates)
    //.pipe(minifyHTML())
    .pipe(gulp.dest(paths.dist + 'templates'))
})

/*
* Serve the files out of /dist
*/
gulp.task('connect', function() {
    connect.server({
        root: paths.dist,
        livereload: true,
        port: 8888
    })
})

gulp.task('watch', function() {
    livereload.listen()
    gulp.watch(paths.index, ['build'])
    gulp.watch(paths.scripts, ['build'])
    gulp.watch(paths.styles, ['build'])
    gulp.watch(paths.templates, ['build'])
    gulp.watch([app.js, app.css, app.html])
    .on('change', function(event) {
        livereload.changed(event.path)
    })
})

/**
 * Gulp tasks
 */
gulp.task('ui', ['fonts', 'css'])
gulp.task('assets', ['copy-bower_fonts'])
gulp.task('static', ['js', 'templates'])
gulp.task('build', ['ui', 'usemin', 'assets', 'static'])
gulp.task('default', ['build', 'watch'])
