const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp")
// const eliminator = require("./resources/gulp/plugins/eliminator");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");

const indexer = new Indexer("src/scripts");
indexer.generate();

let pkgr = new Packager({
    root: __dirname,
    src: "src/scripts",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

const tasks = pkgr.createTasks();

module.exports = {
    default: gulp.series(tasks.default, compileSass, watch),
    publish: gulp.series(tasks.publish, compileSass)
}

function compileSass() {
    const browsersToSupport = [
        "last 4 version",
        "iOS >= 7",
        "Android >= 4",
        "Explorer >= 10",
        "ExplorerMobile >= 11"
    ];

    return gulp.src(["src/scss/components-ltr.scss", "src/scss/components-rtl.scss"])
        .pipe(sourcemaps.init())
        // .pipe(eliminator(setting))
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: browsersToSupport }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`vesta/es6/css`));
}

function watch() {
    gulp.watch(`src/scss/**/*.scss`, compileSass);
    return Promise.resolve();
}