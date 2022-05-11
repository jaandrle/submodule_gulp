/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
const { readdirSync, writeFileSync }= require("fs");
const { join }= require("path");
const glob_file_description= "/* Soubor se generuje automaticky pomoci gulp funkce `sassGlobIndex_` */\n";
const glob_file_name= "_index.scss";

/**
 * Pomocná funkce pro automatické importování sass souborů ve složce.
 * Vygeneruje '_index.scss', do kterého zapíše importy.
 * Tj. do rodičovského sass souboru stačí přidat jen `@import "folder/index";`!
 *
 * @param {string} folder Požadovaná složka
 * @param {function} [filter=noFilter] Vl. funkce pro filtrování. Jako argument dostane název aktuálního souboru a vrací 0/1 (zda zahrnout).
 */
exports.sassGlobIndex_= function(folder, filter= noFilter){
    return new Promise(function(resolve, reject){
        let files_candidates;
        try { files_candidates= readdirSync(folder); }
        catch (e){ reject(e); }
        const files= files_candidates.filter(file_name=> file_name!==glob_file_name && filter(file_name));
        try {
            writeFileSync(
                join(folder, glob_file_name), 
                glob_file_description+files.map(name=> `@import './${name.slice(1, -5)}';`).join("\n")
            );
        } catch (e){
            reject(e);
        }
        resolve();
    });
};

function noFilter(file_name){ return 1; }
