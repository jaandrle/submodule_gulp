# submodule_gulp
Gulp utils – primary use as `git submodule`

## Use in your repo
**Use**:
```bash
cd TARGET_PATH
git submodule add --depth=1 TARGET_REPO
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
const cordova= require("./gulp/dist/task-cordova.js");
```
