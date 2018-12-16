const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp")
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");
const { readFileSync } = require("fs");

const pkg = JSON.parse(readFileSync("package.json"));
const pkgr = new Packager({
    root: __dirname,
    src: "src",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

function indexer() {
    const indexer = new Indexer("src");
    indexer.generate();
    return Promise.resolve();
}

function compileSass() {

    return gulp.src(["src/index-ltr.scss", "src/index-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: pkg.browserslist }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`vesta/es6/css`));
}

function watch() {
    gulp.watch(`src/**/*.scss`, compileSass);
    gulp.watch(`src/**/*.tsx?`, indexer);
    return Promise.resolve();
}

const tasks = pkgr.createTasks();

module.exports = {
    default: gulp.series(indexer, tasks.default, compileSass, watch),
    publish: gulp.series(indexer, tasks.deploy, compileSass, tasks.publish),
}