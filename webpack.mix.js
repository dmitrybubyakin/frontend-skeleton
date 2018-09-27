const mix = require('laravel-mix')
const glob = require('glob-all')
const tailwindcss = require('tailwindcss')
const FileInclude = require('./mix/tasks/FileInclude')

require('./mix/components/Task')
require('./mix/components/ImageMin')
require('laravel-mix-purgecss')

mix
    .options({
        publicPath: 'public',
        processCssUrls: false,
        postCss: [
            tailwindcss('tailwind.js'),
        ],
        hmrOptions: {
            port: process.env.MIX_HMR_PORT || 8080
        }
    })

mix
    .js('resources/js/app.js', 'public/js')
    .sass('resources/scss/app.scss', 'public/css')
    .imageMin('resources/img', 'public/img')
    .task(new FileInclude({
        src: ['resources/template/**/*.html', '!resources/template/includes/**/*.html'],
        dest: 'public/template',
        options: {
            basepath: 'resources/template/includes',
        }
    }))
    .browserSync({
        proxy: process.env.MIX_BS_PROXY || process.env.APP_URL || '127.0.0.1:8080/template',
        port: process.env.MIX_BS_PORT || 3000,
        files: [
            'app/**/*.php',
            'resources/views/**/*.php',
            'resources/template/**/*.html',
            'public/js/**/*.js',
            'public/css/**/*.css',
        ]
    })
    .purgeCss()
    .extract([
        'jquery',
        'axios',
        'vue',
    ])

if (mix.inProduction()) {
    mix.version()
}
