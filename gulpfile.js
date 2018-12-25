const gulp = require("gulp")
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");
const { readFileSync } = require("fs");
const { execSync } = require("child_process");

const pkg = JSON.parse(readFileSync("package.json"));
const target = "__test__";

function indexer() {
    try {
        execSync("npx barrelsby -d ./src --delete");
    } catch (e) {
        return Promise.reject(e);
    }
    return Promise.resolve();
}

function compileTypescript() {
    try {
        execSync("npx tsc -p .");
    } catch (e) {
        return Promise.reject(e);
    }
    return Promise.resolve();
}

function compileSass() {
    return gulp.src(["src/index-ltr.scss", "src/index-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: pkg.browserslist }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`build/css`))
        .pipe(gulp.dest(`${target}/public/css`));
}

function copy4test() {
    return gulp.src("src/**/*").pipe(gulp.dest(`${target}/src/components`));
}

function watch() {
    gulp.watch(`src/**/*.scss`, gulp.series(compileSass, copy4test));
    gulp.watch(["src/**/*.ts", `src/**/*.tsx`, "!src/index.ts"], gulp.series(indexer, compileTypescript, copy4test));
    return Promise.resolve();
}

module.exports = {
    default: gulp.series(indexer, compileTypescript, compileSass, copy4test, watch),
    deploy: gulp.series(indexer, compileTypescript, compileSass),
}