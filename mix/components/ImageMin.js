const mix = require('laravel-mix')
const path = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')

class ImageMin {
    name() {
        return 'imageMin'
    }

    dependencies() {
        return [
            'copy-webpack-plugin',
            'imagemin-webpack-plugin',
            'imagemin-gifsicle',
            'imagemin-pngquant',
            'imagemin-mozjpeg',
            'imagemin-svgo',
        ]
    }

    register(from, to, options = {}) {
        this.from = from
        this.to = this.normalizeOutput(to)

        this.options = Object.assign({
            enabled: mix.inProduction(),
            imageminGifsicle: {},
            imageminPngquant: {
                quality: 75
            },
            imageminMozjpeg: {
                quality: 75
            },
            imageminSvgo: {},
        }, options)
    }

    normalizeOutput(output) {
        return output.replace(mix.config.publicPath + path.sep, '')
    }

    webpackConfig(config) {
        if (!this.options.enabled) {
            return
        }

        config.plugins.push(...[
            this.createCopyWebpackPlugin(),
            this.createImageminPlugin()
        ])
    }

    createCopyWebpackPlugin() {
        return new CopyWebpackPlugin([{
            from: this.from,
            to: this.to,
        }])
    }

    createImageminPlugin() {
        return new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                require('imagemin-gifsicle')(this.options.imageminGifsicle),
                require('imagemin-pngquant')(this.options.imageminPngquant),
                require('imagemin-mozjpeg')(this.options.imageminMozjpeg),
                require('imagemin-svgo')(this.options.imageminSvgo),
            ]
        })
    }
}

mix.extend('imageMin', new ImageMin())
