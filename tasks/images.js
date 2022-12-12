import { paths } from "../gulpfile.js";
import gulp from "gulp";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg";
import newer from "gulp-newer";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

let production = false;
const argv = yargs(hideBin(process.argv)).argv;
production = !!argv.production;

const images = () => {
    return gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(
            gulpif(
                production,
                imagemin([
                    imageminPngquant({
                        speed: 2,
                        quality: [0.75, 0.85],
                    }),
                    imageminZopfli({
                        more: true,
                    }),
                    imageminMozjpeg({
                        progressive: true,
                        quality: 90,
                    }),
                    // imagemin.svgo({
                    //     plugins: [
                    //         { removeViewBox: false },
                    //         { removeUnusedNS: false },
                    //         { removeUselessStrokeAndFill: false },
                    //         { cleanupIDs: false },
                    //         { removeComments: true },
                    //         { removeEmptyAttrs: true },
                    //         { removeEmptyText: true },
                    //         { collapseGroups: true }
                    //     ]
                    // })
                ])
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

export default images;
