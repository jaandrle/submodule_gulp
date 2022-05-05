/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
exports.log= (...args)=> console.log("["+(new Date()).toTimeString().split(" ")[0]+"]", "·".repeat("Starting".length), ...args);
