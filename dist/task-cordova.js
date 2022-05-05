/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
'use strict';
const { target, log }= global;
const { existsSync, readFileSync, createWriteStream, writeFileSync }= require('fs');
const { join }= require("path");
const { spawn }= require("child_process");
const readline= require("readline");

Object.assign(exports, { cordova, cmdCordova });

function cordova(done){
    if(!target){
        log("Target not specified so `cordova run android` skipped.");
        return done();
    }
    log(`\`cordova run android --target ${target}\``);
    const cwd= join(__dirname, "../../");
    const log_file_path= join(cwd, 'build/gulp/build.log');
    let [ , build_time_prev ]= /RUN [A-Z]+ in (\d+)s/.exec((!existsSync(log_file_path) ? "" : readFileSync(log_file_path))) || [ null, "60" ];
    build_time_prev= parseInt(build_time_prev);
    const build_time_start= Date.now();
    const runTime= ()=> ((Date.now()-build_time_start)/1000).toFixed(0);
    const log_stream= createWriteStream(log_file_path);

    let l= 0, L= [ "|", "/", "–", "\\", "|", "/", "–", "\\" ];
    const i= setInterval(function(){
        readline.clearLine(process.stdout);
        const diff= runTime();
        const running_time_text= diff<build_time_prev ?
            `ends in ca. ${build_time_prev-diff}s` :
            `${diff}s since start (ususal max ~120s)`;
        if(l===8) l= 0;
        log(`running ${L[l++]} `+running_time_text);
        readline.moveCursor(process.stdout, 0, -1);
    }, 750);
    
    const cmd= cmdCordova([ "run", "android", "--target", target ], { cwd });
    cmd.stdout.pipe(log_stream);
    cmd.stderr.pipe(log_stream);
    cmd.on("exit", function(){
        const log_data= readFileSync(log_file_path).toString();
        const is_fail= /(fail|error)/ig.test(log_data);
        const build_time= (( build_time_prev + parseInt(runTime()) )/2).toFixed();
        writeFileSync(log_file_path, log_data+`\nRUN ${is_fail?"FAILED":"SUCCESSFUL"} in ${build_time}s`);
        clearInterval(i);
        readline.clearLine(process.stdout);
        if(!is_fail) return done();
        done(new Error(`Podrobnější informace v '${log_file_path}'`));
    });
}

/**
 * @param {string[]} args 
 * @param {import('child_process').SpawnOptionsWithoutStdio} params
 * @returns {import('child_process').ChildProcessWithoutNullStreams}
 */
function cmdCordova(args, params){
    return spawn("cordova"+(process.platform==="win32"?".cmd":""), args, params);
}
