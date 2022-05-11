/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
module.exports= {
    /**
    * Converts `npx gulp --key1=value1 … ` into object. Arguments start with **_** will be ignored (example `--_skip=test`).
    * @param {object} defaults
    * */
    currentBuildParams(defaults= { dev: true, target: null }){
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
    },
    globalConfigPath(file_name= "package_global.json"){
        const { APPDATA, HOME }= process.env;
        /* 
            OS X        - '/Users/user/Library/Preferences/package_global.json'
            Windows 8   - 'C:\Users\user\AppData\Roaming\package_global.json'
            Windows XP  - 'C:\Documents and Settings\user\Application Data\package_global.json'
            Linux       - '/home/user/.local/share/package_global.json'
        */
        return (APPDATA || (process.platform == 'darwin' ? HOME + '/Library/Preferences' : HOME + "/.local/share"))+'/'+file_name;
    },
    log: (...args)=> console.log("["+(new Date()).toTimeString().split(" ")[0]+"]", "·".repeat("Starting".length), ...args)
};
