import { paths } from "../gulpfile.js";
import gulp from "gulp";
import cheerio from "gulp-cheerio";
import svg from "gulp-svg-sprite";
import debug from "gulp-debug";
import browsersync from "browser-sync";

const svgsprite = () => {
    return gulp
        .src(paths.svgsprite.src)
        .pipe(
            cheerio({
                run: function ($) {
                    $("[fill]").removeAttr("fill");
                    $("[stroke]").removeAttr("stroke");
                    $("[style]").removeAttr("style");
                },
                parserOptions: {
                    xmlMode: true,
                },
            })
        )
        .pipe(
            svg({
                // svg: {
                //     transform: [
                //         function(svg) {
                //             return svg.replace(/fill="none"|fill="#[a-zA-Z0-9]{1,6}"|stroke="#[a-zA-Z0-9]{1,6}"/g, "");
                //         },
                //     ]
                // },
                mode: {
                    symbol: {
                        sprite: "../svgsprite.svg",
                    },
                },
            })
        )
        .pipe(gulp.dest(paths.svgsprite.dist))
        .pipe(
            debug({
                title: "SVG Sprite",
            })
        )
        .on("end", browsersync.reload);
};

export default svgsprite;
