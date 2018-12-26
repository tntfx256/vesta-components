const gulp = require("gulp")
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");
const { readFileSync } = require("fs");
const { execSync } = require("child_process");
const { Indexer, Packager } = require("@vesta/devmaid");

const pkg = JSON.parse(readFileSync("package.json"));
const target = "__test__";

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
    return gulp.src(["src/index-ltr.scss", "src/index-rtl.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: pkg.browserslist }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`vesta/es6/css`))
        .pipe(gulp.dest(`${target}/public/css`));
}

function copy4test() {
    return gulp.src("src/**/*").pipe(gulp.dest(`${target}/src/components`));
}

function watch() {
    gulp.watch(`src/**/*.scss`, gulp.series(compileSass, copy4test));
    gulp.watch(["src/**/*.ts", `src/**/*.tsx`, "!src/index.ts"], copy4test);
    return Promise.resolve();
}

const tasks = pkgr.createTasks();
module.exports = {
    default: gulp.series(tasks.default, compileSass, copy4test, watch),
    publish: gulp.series(tasks.deploy, compileSass, tasks.publish),
}