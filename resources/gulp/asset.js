const { src, dest, parallel, series, watch } = require("gulp");
const htmlMin = require("gulp-htmlmin");
const replace = require("gulp-replace");
const eliminator = require("./plugins/eliminator");

module.exports = function(setting) {
    let dir = setting.dir;

    const files = [];

    function root() {
        return src(files).pipe(dest(`${dir.build}`));
    }

    function watches() {
        watch(files, root);
    }

    return {
        tasks: root,
        watch: watches,
    };
};