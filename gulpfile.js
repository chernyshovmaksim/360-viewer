const {dest, src, parallel, watch, series} = require('gulp');

const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const image = require('gulp-image');

const browserSync = require('browser-sync').create();


function css(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(csso())
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream());
}

function libs(){
    return src([
        // './node_modules/slick-carousel/slick/slick.scss'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(dest('./src/sass'));
}


function html(){
    return src('./src/**/*.html')
    .pipe(dest('./build'))
    .pipe(browserSync.stream());
}

function images(){
    return src([
        './src/images/**/*.jpg',
        './src/images/**/*.png',
        './src/images/**/*.gif',
        './src/images/**/*.svg'
    ])
    .pipe(image())
    .pipe(dest('./build/images'))
    .pipe(browserSync.stream());
}


function scripts(){
    return src('./src/scripts/app.js')
    .pipe(webpackStream(webpackConfig, require('webpack')))
    .pipe(dest('./build/scripts'))
    .pipe(browserSync.stream());
}


function server(){
    browserSync.init({
        server: './build'
    });

    watch('./src/sass/*.scss', css);
    watch('./src/**/*.html', html);
    watch('./src/images/*', images);
    watch('./src/scripts/*.js', scripts); 
}


exports.dev = parallel(css, html, images, scripts, server);
exports.build = parallel(css, html, images, scripts);