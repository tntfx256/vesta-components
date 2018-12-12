const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp");

let pkgr = new Packager({
    root: __dirname,
    src: "src/components",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

const tasks = pkgr.createTasks();

module.exports = {
    default: gulp.series(indexer, tasks.default),
    publish: gulp.series(indexer, tasks.deploy, tasks.publish)
}

function indexer() {
    const indexer = new Indexer("src/components");
    indexer.generate();
    return Promise.resolve();
}
