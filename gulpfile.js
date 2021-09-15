const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function compileCSS(done) {
    src("src/scss/app.scss")
        .pipe( sass({
            outputStyle: "expanded"
        }) )
        .pipe(postcss([autoprefixer()]))
        .pipe( dest("build/css"));
    done();
}

function dev() {
    watch("src/scss/**/*.scss", compileCSS);
}

exports.compileCSS = compileCSS;
exports.dev = dev; 
exports.default = series( compileCSS, dev );