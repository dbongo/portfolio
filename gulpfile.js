var gulp = require('gulp')
var usemin = require('gulp-usemin')
var connect = require('gulp-connect')
var minifyCss = require('gulp-minify-css')
var minifyJs = require('gulp-uglify')
var concat = require('gulp-concat')
var less = require('gulp-less')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate')
var rimraf = require('gulp-rimraf')
//var minifyHTML = require('gulp-minify-html')

var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/less/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    fonts: 'src/fonts/**.*',
    bower_fonts: 'src/vendor/**/*.{ttf,woff,eof,svg}'
}

/**
 * Clean the dist dir
 */
gulp.task('clean-dist', function() {
    return gulp.src('./', {
        read: false
    })
    .pipe(rimraf({
        force: true
    }))
});

gulp.task('clean-css', function() {
    return gulp.src('css/*', {
        read: false
    })
    .pipe(rimraf({
        force: true
    }))
})

gulp.task('clean-fonts', function() {
    return gulp.src('fonts/*', {
        read: false
    })
    .pipe(rimraf({
        force: true
    }))
})

/**
 * Copy fonts to dist directory
 */
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest('fonts'))
})

/**
* Compile less
*/
gulp.task('less', function() {
    return gulp.src(paths.styles)
    .pipe(less())
    .pipe(concat('hackapp.css'))
    .pipe(gulp.dest('css'))
})

/**
 * Minify css
 */
gulp.task('css', ['less'], function() {
    return gulp.src('css/hackapp.css')
    .pipe(minifyCss())
    .pipe(concat('hackapp.min.css'))
    .pipe(gulp.dest('css'))
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
    .pipe(gulp.dest('./'))
})

/**
 * Copy assets
 */
gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
    .pipe(rename({
        dirname: '/fonts'
    }))
    .pipe(gulp.dest('lib'))
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
    .pipe(gulp.dest('js'))
})

// gulp.task('custom-less', function() {
//     return gulp.src(paths.styles)
//     .pipe(less())
//     .pipe(gulp.dest('dist/css'))
// })

gulp.task('templates', function() {
    return gulp.src(paths.templates)
    //.pipe(minifyHTML())
    .pipe(gulp.dest('templates'))
})

/*
* Serve the files out of /dist
*/
gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 8888
    })
})

/**
 * Reload the web server
 */
gulp.task('livereload', function() {
    gulp.src('index.html')
    .pipe(connect.reload())
})


/**
 * Gulp tasks
 */
gulp.task('clean', ['clean-css', 'clean-fonts', 'clean-dist'])

gulp.task('ui', ['fonts', 'css'])

gulp.task('assets', ['copy-bower_fonts'])

gulp.task('static', ['js', 'templates'])

gulp.task('build', ['ui', 'usemin', 'assets', 'static'])

gulp.task('default', ['build', 'connect', 'livereload'])
