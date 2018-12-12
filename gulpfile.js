const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp")
const { readFileSync, writeFileSync } = require("fs");

let pkgr = new Packager({
    root: __dirname,
    src: "src/components",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

const tasks = pkgr.createTasks();

module.exports = {
    default: gulp.series(indexer, addWithRoutes,tasks.default, watch),
    publish: gulp.series(indexer, addWithRoutes, tasks.deploy, tasks.publish)
}

function addWithRoutes() {
    // const indexFile = `${__dirname}/src/components/index.ts`;
    // let indexContent = readFileSync(indexFile, { encoding: "utf8" });
    // indexContent = indexContent.replace(`export { NavbarMainButtonType } from "./core/Navbar";`,
    //     `export { default as Navbar, NavbarMainButtonType } from "./core/Navbar";`);
    // writeFileSync(indexFile, indexContent);
    return Promise.resolve();
}

function indexer() {
    const indexer = new Indexer("src/components");
    indexer.generate();
    return Promise.resolve();
}

function watch() {
    gulp.watch(`src/scss/**/*.scss`, indexer);
    return Promise.resolve();
}