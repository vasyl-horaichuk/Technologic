import gulp from "gulp";

import clean from "./tasks/clean.js";
import html from "./tasks/html.js";
import styles from "./tasks/styles.js";
import scripts from "./tasks/scripts.js";
import images from "./tasks/images.js";
import webp from "./tasks/webp.js";
import svgsprite from "./tasks/svgsprite.js";
import fonts from "./tasks/fonts.js";
import serve from "./tasks/serve.js";

const distFolder = "dist",
    srcFolder = "src";

const paths = {
    html: {
        src: `./${srcFolder}/html/*.html`,
        dist: `./${distFolder}/`,
        watch: [`./${srcFolder}/html/*.html`, `./${srcFolder}/html/**/*.html`],
    },
    styles: {
        src: `./${srcFolder}/styles/bundle.{scss,sass}`,
        dist: `./${distFolder}/css/`,
        watch: [
            `./${srcFolder}/styles/*.{scss,sass}`,
            `./${srcFolder}/styles/**/*.{scss,sass}`,
        ],
    },
    scripts: {
        src: `./${srcFolder}/js/index.js`,
        dist: `./${distFolder}/js/`,
        watch: [`./${srcFolder}/js/*.js`, `./${srcFolder}/js/**/*.js`],
    },
    images: {
        src: `./${srcFolder}/img/**/*.{jpg,jpeg,png,gif,tiff,svg}`,
        dist: `./${distFolder}/img/`,
        watch: `./${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg,tiff}`,
    },
    svgsprite: {
        src: `./${srcFolder}/img/svgsprite/*.svg`,
        dist: `./${distFolder}/img/svgsprite/`,
        watch: `./${srcFolder}/img/svgsprite/*.svg`,
    },
    fonts: {
        src: `./${srcFolder}/fonts/**/*.{ttf,woff,woff2}`,
        dist: `./${distFolder}/fonts/`,
        watch: `./${srcFolder}/fonts/**/*.{ttf,woff,woff2}`,
    },
};

export { paths };

export const dev = gulp.series(
    clean,
    gulp.parallel([html, styles, scripts, images, webp, svgsprite, fonts]),
    gulp.parallel(serve)
);

export const prod = gulp.series(
    clean,
    gulp.parallel([html, styles, scripts, images, webp, svgsprite, fonts])
);

export default dev;
