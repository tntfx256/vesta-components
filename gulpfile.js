const gulp = require("gulp")
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");
const { readFileSync } = require("fs");
const { Indexer, Packager } = require("@vesta/devmaid");

const target = "test";

const indexer = new Indexer("src");
indexer.generate();

let pkgr = new Packager({
    root: __dirname,
    src: "src",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

function compileSass() {
    const browsersToSupport = [
        "last 4 version",
        "iOS >= 7",
        "Android >= 4",
        "Explorer >= 10",
        "ExplorerMobile >= 11"
    ];
    return gulp.src(["src/index-ltr.scss", "src/index-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: browsersToSupport }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`vesta/es6/css`))
        .pipe(gulp.dest(`${target}/public/css`));
}

// function copy4test() {
//     return gulp.src("src/**/*").pipe(gulp.dest(`${target}/src/components`));
// }

function copyStyle() {
    return gulp.src("src/**/*.scss").pipe(gulp.dest("vesta/es6"));
}

function watch() {
    gulp.watch(`src/**/*.scss`, gulp.series(copyStyle, compileSass));
    gulp.watch(["src/**/*.ts", `src/**/*.tsx`, "!src/index.ts"]);
    return Promise.resolve();
}

const tasks = pkgr.createTasks();
module.exports = {
    default: gulp.series(tasks.default, copyStyle, compileSass, watch),
    publish: gulp.series(tasks.deploy, copyStyle, compileSass, tasks.publish),
}