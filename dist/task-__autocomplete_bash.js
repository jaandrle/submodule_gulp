/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
exports.__autocomplete_bash= function(done){
    const { spawnSync }= require("child_process");
    const args= (process.argv.slice(2)).reduce((out, curr)=> Reflect.set(out, ...curr.split("="))&&out, {});
    const cur= (args["--_c"]||"").replace("=", "");
    switch (cur){
        case "--dev" || "--sass_dev":
            console.log([ "0", "1" ].map(i=> cur+`=${i}`).join(" "));
            break;
        case "--target":
            try{
                const data= spawnSync("adb", [ "devices" ]).stdout.toString().split("\n").slice(1, -2);
                console.log(data.map(i=> cur+`=${i.split("\t")[0]}`).join(" "));
            } catch(e){}
            break;
    }
    return done();
};
