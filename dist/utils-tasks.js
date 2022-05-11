/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
module.exports= {
    /**
    * Now you can use array of `gulp.src(…).pipe(...).…`
    * @param {NodeJS.ReadWriteStream[]} gulp_srcs
    * @param {function} done
    * */
    parallelSrcs(gulp_srcs, done){
        gulp_srcs= gulp_srcs.filter(Boolean);
        let { length }= gulp_srcs;
        const outs= [];
        const gotoDone= function(e){
            length-= 1;
            if(length) return outs.push(e);
            const final_outs= outs.filter(Boolean);
            return done(final_outs.length?final_outs:undefined);
        };
        gulp_srcs.forEach(gs=> gs.on("end", gotoDone));
    },
    /**
    * @example
    * const sass= require('gulp-sass')(require('node-sass'));
    * gulp.src(['./src/sass/main.scss'])
    * .pipe(sass_error.save(sass))
    * .pipe(gulp.dest('../www/css/'))
    * .on("end", sass_error.load(done))
    * */
    sass_error: {
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
    }
};
