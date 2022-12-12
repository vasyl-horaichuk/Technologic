import { paths } from "../gulpfile.js";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import mincss from "gulp-clean-css";
import groupmedia from "gulp-group-css-media-queries";
import autoprefixer from "gulp-autoprefixer";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

const sass = gulpSass( dartSass );

let production = false;
const argv = yargs(hideBin(process.argv)).argv;
production = !!argv.production;

const styles = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError)) 
        .pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            cascade: false,
            grid: true
        })))
        // .pipe(autoprefixer({
        //     cascade: false,
        //     grid: true
        // }))
        .pipe(gulpif(production, mincss({
            compatibility: "ie8", 
            level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(debug({
            title: "CSS files"
        }))
        .pipe(browsersync.stream());
};

export default styles;

