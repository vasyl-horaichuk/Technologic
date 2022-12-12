import { paths } from "../gulpfile.js";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import webpackConfig from "../webpack.config.js";

let production = false;
const argv = yargs(hideBin(process.argv)).argv;
production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

const scripts = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(
            gulpif(
                production,
                rename({
                    suffix: ".min",
                })
            )
        )
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(
            debug({
                title: "JS files",
            })
        )
        .on("end", browsersync.reload);
};

export default scripts;
