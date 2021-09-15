const { src, dest, watch, series } = require("gulp");

// CSS, SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// IMG
const imagemin = require("gulp-imagemin");

function compileCSS(done) {
    src("src/scss/app.scss")
        .pipe( sass({
            outputStyle: "expanded"
        }) )
        .pipe(postcss([autoprefixer()]))
        .pipe( dest("build/css"));
    done();
}

function images(done) {
    src("src/img/**/*")
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(dest("build/img"));

    done();
}

function dev() {
    watch("src/scss/**/*.scss", compileCSS);
    watch("src/img/**/*", images);
}

exports.compileCSS = compileCSS;
exports.dev = dev; 
exports.images = images; 
exports.default = series( images, compileCSS, dev );