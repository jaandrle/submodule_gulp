/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
'use strict';
const { spawn }= require("child_process");

/**
 * Generates documentation for Web Components.
 * @param {string} source Path to web component (preferred directory).
 * @param {string} output Path to where to save output files ("vscode.json" and "markdown.md").
 * */
exports.webComponents_= function(source, output){
    return Promise.all([ webComponentsCmd_(source, output, "vscode"), webComponentsCmd_(source, output, "markdown") ]);
};

function webComponentsCmd_(source, output, format){ return new Promise(function(resolve, reject){
    const extension= format==="markdown" ? "md" : "json";
    spawn("npx", [ "web-component-analyzer", source, "--format", format, "--outFile", `${output}/${format}.${extension}` ])
    .on("exit", resolve)
    .on("error", reject);
});}
