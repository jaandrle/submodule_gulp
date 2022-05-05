/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
/**
 * Now you can use array of `gulp.src(…).pipe(...).…`
 * @param {NodeJS.ReadWriteStream[]} gulp_srcs
 * @param {function} done
 * */
exports.parallelSrcs= function(gulp_srcs, done){
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
}
