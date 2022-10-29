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
import svgstore from 'gulp-svgstore';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import { deleteAsync as del } from "del";

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('docs/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('docs/css'))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('docs'));
}

// JS

export const js = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser({
      'format': {
        'comments': false,
      },
    }))
    .pipe(gulp.dest('docs/js'));
}

// SVG Sprite

const svgsprite = () => {
  return gulp.src("source/img/svg-sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("docs/img"));
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

export const towebp = () => {
  return gulp.src(["source/img/**/*.{png,jpg}", "!source/img/icon/*.{png,jpg}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
}

// Clean

export const clean = () => {
  return del('docs');
};

// Copy

export const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/favicon.ico",
    "!source/img/svg-sprite/*",
    "!source/img/svg-sprite"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/js/*.js').on('change', browser.reload);
  gulp.watch('source/js/*.js', gulp.series(js, reload));
  gulp.watch('source/img/svg-sprite/*').on('change', browser.reload);
  gulp.watch('source/img/svg-sprite/*', gulp.series(svgsprite, reload));
}

export default gulp.series(
  clean, copy, styles, html, js, svgsprite, server, watcher
);

export const build = gulp.series(
  clean, copy, styles, html, js, svgsprite
);
