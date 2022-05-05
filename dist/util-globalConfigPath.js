/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
exports.globalConfigPath= function(file_name= "package_global.json"){
    const { APPDATA, HOME }= process.env;
    /* 
        OS X        - '/Users/user/Library/Preferences/package_global.json'
        Windows 8   - 'C:\Users\user\AppData\Roaming\package_global.json'
        Windows XP  - 'C:\Documents and Settings\user\Application Data\package_global.json'
        Linux       - '/home/user/.local/share/package_global.json'
     */
    return (APPDATA || (process.platform == 'darwin' ? HOME + '/Library/Preferences' : HOME + "/.local/share"))+'/'+file_name;
}
