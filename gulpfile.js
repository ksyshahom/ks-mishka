import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import minify from 'gulp-csso';
import rename from 'gulp-rename';
import imagemin, {optipng, mozjpeg, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Images

export const images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      optipng({optimizationLevel: 3}),
      mozjpeg({progressive: true}),
      svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest("source/img"));
}

// Webp

export const towebp = () => {
  return gulp.src(["source/img/**/*.{png,jpg}", "!source/img/icon/*.{png,jpg}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
}

export default gulp.series(
  styles, server, watcher
);
