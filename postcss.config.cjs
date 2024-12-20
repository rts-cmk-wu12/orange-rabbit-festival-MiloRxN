module.exports = {
    plugins: {
        'postcss-font-magician': {
            foundries: ['google']
        },
        'autoprefixer': {},
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
    }
}