import { paths } from "../gulpfile.js";
import gulp from "gulp";
import gulpif from "gulp-if";
import imageminWebp from "imagemin-webp";
import gulpWebp from "gulp-webp";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

let production = false;
const argv = yargs(hideBin(process.argv)).argv;
production = !!argv.production;

const webp = () => {
    return gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(
            gulpWebp(
                gulpif(
                    production,
                    imageminWebp({
                        lossless: true,
                        quality: 90,
                        alphaQuality: 100,
                    })
                )
            )
        )
        .pipe(gulp.dest(paths.images.dist))
        .pipe(
            debug({
                title: "Images",
            })
        )
        .on("end", browsersync.reload);
};

export default webp;
