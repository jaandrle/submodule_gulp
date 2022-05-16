[![LTS+sub-branches](https://img.shields.io/badge/submodule-LTS+sub--branches-informational?style=flat-square&logo=git)](https://github.com/IndigoMultimediaTeam/lts-driven-git-submodules)
# submodule_gulp
Gulp utils – primary use as `git submodule`.

## Use in your repo
**Use**:
```bash
cd TARGET_PATH
git submodule add -b main --depth=1 git@github.com:jaandrle/submodule_gulp.git
```
… more info [`git submodule`](https://gist.github.com/jaandrle/b4836d72b63a3eefc6126d94c683e5b3).

Suggested file tree is:
```
…
    gulpfile.js
    gulp/
        submodule_gulp
        … (other helpers)
```
…for using scripts, just `require` wanted one in `dist/`:
```javascript
//gulpfile.js (see above)
const cordova= require("./gulp/submodule_gulp/dist/task-cordova.js");
```
