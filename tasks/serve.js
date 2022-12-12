import { paths } from "../gulpfile.js";
import gulp from "gulp";
import browsersync from "browser-sync";

import html from "./html.js";
import styles from "./styles.js";
import scripts from "./scripts.js";
import images from "./images.js";
import webp from "./webp.js";
import svgsprite from "./svgsprite.js";
import fonts from "./fonts.js";

const serve = () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: false,
    });

    gulp.watch(paths.html.watch, gulp.parallel(html));
    gulp.watch(paths.styles.watch, gulp.parallel(styles));
    gulp.watch(paths.scripts.watch, gulp.parallel(scripts));
    gulp.watch(paths.images.watch, gulp.parallel(images));
    gulp.watch(paths.images.watch, gulp.parallel(webp));
    gulp.watch(paths.svgsprite.watch, gulp.parallel(svgsprite));
    gulp.watch(paths.fonts.watch, gulp.parallel(fonts));
};

export default serve;
