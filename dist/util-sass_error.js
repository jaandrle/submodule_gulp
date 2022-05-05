/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */

/**
 * @example
 * const sass= require('gulp-sass')(require('node-sass'));
 * gulp.src(['./src/sass/main.scss'])
 * .pipe(sass_error.save(sass))
 * .pipe(gulp.dest('../www/css/'))
 * .on("end", sass_error.load(done))
 * */
exports.sass_error= {
    /** Místo `sass().on("error"` */
    save(sass){
        return sass().on("error", function sassError(e){
            sass.logError.call(this, e);
            global.sass_error= true;
        });
    },
    /** Obalí funkci a pokud chyba v Sassu vloží argument 'Sass error' */
    load(fun){
        return function(e){
            if(global.sass_error)
                e= "Sass error";
            return fun(e);
        };
    }
};
