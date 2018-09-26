let Task = require('laravel-mix/src/tasks/Task')
let FileCollection = require('laravel-mix/src/FileCollection')
let fileInclude = require('gulp-file-include')
let vfs = require('vinyl-fs')

class FileInclude extends Task
{
    run() {
        this.src = this.data.src
        this.dest = this.data.dest
        this.options = this.data.options || {}

        this.files = this.getFileCollection(this.src)

        this.process()
    }

    getFileCollection (src) {
        if (! Array.isArray(src)) {
            src = [src]
        }

        return new FileCollection(src.filter(entry => !entry.startsWith('!')))
    }

    process() {
        vfs.src(this.src)
            .pipe(fileInclude(this.options))
            .pipe(vfs.dest(this.dest))
    }

    onChange() {
        this.process()
    }
}

module.exports = FileInclude
