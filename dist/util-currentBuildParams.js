/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
/**
 * Converts `npx gulp --key1=value1 … ` into object. Arguments start with **_** will be ignored (example `--_skip=test`).
 * @param {object} defaults
 * */
exports.currentBuildParams= function(defaults= { dev: true, target: null }){
    const args= process.argv.slice(2);
    let out= {};
    for(let i=0, { length }= args, arg; i<length; i++){
        arg= args[i].trim();
        if(!/--/g.test(arg) || /--_/g.test(arg)) continue;
        arg= arg.replace("--", "");
        Reflect.set(out, ...arg.split("="));
    }
    if(out.dev) out.dev= Boolean(parseInt(out.dev));
    return Object.assign(defaults, out);
};

/** @param {string[]} args */
function currentBuildParams(args){
    let out= {};
    for(let i=0, { length }= args, arg; i<length; i++){
        arg= args[i].trim();
        if(!/--/g.test(arg) || /--_/g.test(arg)) continue;
        arg= arg.replace("--", "");
        Reflect.set(out, ...arg.split("="));
    }
    if(out.dev) out.dev= Boolean(parseInt(out.dev));
    return Object.assign(JSON.parse('{"dev":true,"sass_dev":false,"lang":"en","APP_CODE":null,"target":null}'), out);
}
