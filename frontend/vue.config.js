module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/': '' },
                changeOrigin: true,
                secure: false,
            },
        },
    },
};
