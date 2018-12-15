const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp")
// const eliminator = require("./resources/gulp/plugins/eliminator");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postCss = require("gulp-postcss");
const autoPrefixer = require("autoprefixer");
const csswring = require("csswring");
const mqpacker = require("css-mqpacker");

const pkgr = new Packager({
    root: __dirname,
    src: "src",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

const tasks = pkgr.createTasks();

module.exports = {
    default: gulp.series(indexer, tasks.default, compileSass, watch),
    publish: gulp.series(indexer, tasks.deploy, compileSass, tasks.publish),
    sass: gulp.series(compileSass, watch)
}

function indexer() {
    const indexer = new Indexer("src");
    indexer.generate();
    return Promise.resolve();
}

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
        // .pipe(eliminator(setting))
        .pipe(sass())
        .pipe(postCss([autoPrefixer({ browsers: browsersToSupport }), mqpacker, csswring]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`vesta/es6/css`))
        .pipe(gulp.dest(`__test__/public/css`));
}

function watch() {
    // gulp.watch(`src/scss/**/*.scss`, compileSass);
    gulp.watch(`src/components/**/*.tsx?`, indexer);
    return Promise.resolve();
}