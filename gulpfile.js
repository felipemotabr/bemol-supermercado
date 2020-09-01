const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");

// Função para compila todo o .scss para css
function style() {
  return gulp.src('scss/config.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Função para compilar o arquivos js
function script() {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'js/**/*.js'
  ])
    .pipe(gulp.dest('dist/js'))
}

// Função que escuta todas as alterações e compila direto
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "/index.html"
    }
  });
  gulp.watch('scss/**/*.scss', style)
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.watch = watch;