/* jshint esversion: 8,-W097, -W040, node: true, expr: true, undef: true */
import { log } from "node:console";
import { exit } from "node:process";

export const s={
	red: str=> "\x1b[1;91m"+str+"\x1b[0m",
	blue: str=> "\x1b[0;34m"+str+"\x1b[0m",
	green: str=> "\x1b[01;32m"+str+"\x1b[0m",
	purple: str=> "\x1b[0;35m"+str+"\x1b[0m",
	yellow: str=> "\x1b[0;33m"+str+"\x1b[0m",
	gray: str=> "\x1b[38;2;150;150;150m"+str+"\x1b[0m",
	error: str=> "\x1b[38;2;252;76;76m"+str+"\x1b[0m"
};
export function echo(...messages){
	log(...messages.map(v=> String(v)==="[object Object]" ? v : String(v).replaceAll("\t", "    ")));
}
export function error(...messages){
	echo(s.red("Error"));
	echo(...messages);
	exit(1);
}
/**
	* Returns object representation of given arguments. Script name is under `_name` key, arguments without `-`/`--` are under `_` key.
	* @param {NodeJS.Process.argv} argv
	* @param {Record<string, any>} initial Initial values
	* @returns {{ _name: string, _: string[] } & Record<string, any>}
	* @example
	* script arg1 --arg2=val -arg3 val --arg4
	* => { _name: "script", _: [ "arg1" ], arg2: "val", arg3: "val", arg4: true }
	* */
export function parseArgsMinimal(initial= {}, argv= process.argv){
	const out= Object.create(initial);
	out._name= argv[1].slice(argv[1].lastIndexOf("/")+1);
	out._= [];
	const args= argv.slice(2);
	for(let i= 0, { length }= args; i<length; i+= 1){
		const item= args[i];
		if(0===item.indexOf("--")){
			const [ name, value= true ]= item.slice(2).split("=");
			Reflect.set(out, name, value);
			continue;
		}
		if(0!==item.indexOf("-")){
			out._.push(item);
			continue;
		}
		let next= args[i+1];
		if(!next || !next.indexOf("-"))
			next= true;
		Reflect.set(out, item.slice(1), next);
		if(next!==true)
			i+= 1;
	}
	if(!out._.length && initial._ && initial._.length)
		out._= initial._;
	return out;
}
