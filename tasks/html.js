import { paths } from "../gulpfile.js";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

let production = false;
const argv = yargs(hideBin(process.argv)).argv;
production = !!argv.production;

const html = () => {
    return gulp
        .src(paths.html.src)
        .pipe(
            include({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browsersync.stream());
};

export default html;
