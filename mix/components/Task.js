const mix = require('laravel-mix')

class Task {
    name() {
        return 'task'
    }

    register(task) {
        Mix.addTask(task)
    }
}

mix.extend('task', new Task())
