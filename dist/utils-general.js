/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
const readline= require("readline");
const log= (...args)=> console.log("["+(new Date()).toTimeString().split(" ")[0]+"]", "·".repeat("Starting".length), ...args);

module.exports= {
	/**
	* Converts `npx gulp --key1=value1 … ` into object. Arguments start with **_** will be ignored (example `--_skip=test`).
	* @param {object} defaults
	* */
	currentBuildParams(defaults= { dev: true, target: null }){
		const args= process.argv.slice(2);
		const is_json= args.indexOf("--json");
		if(is_json>=0) return Object.assign(defaults, JSON.parse(args[is_json+1]));
		
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
			OS X		- '/Users/user/Library/Preferences/package_global.json'
			Windows 8	- 'C:\Users\user\AppData\Roaming\package_global.json'
			Windows XP	- 'C:\Documents and Settings\user\Application Data\package_global.json'
			Linux		- '/home/user/.local/share/package_global.json'
		*/
		return (APPDATA || (process.platform == 'darwin' ? HOME + '/Library/Preferences' : HOME + "/.local/share"))+'/'+file_name;
	},
	log,
	logProgress(...args){
		const L= [ "|", "/", "–", "\\", "|", "/", "–", "\\" ];
		const { length }= L;
		const time_start= (new Date()).toLocaleTimeString("cs-CZ");
		let l= 0;
		
		const i= setInterval(function(){
			if(l===length) l=0;
			log(`[${L[l++]} started ${time_start}]`, ...args);
			readline.moveCursor(process.stdout, 0, -1);
		}, 750);
		return function end(){
			clearInterval(i);
			readline.clearLine(process.stdout);
		};
	}
};
