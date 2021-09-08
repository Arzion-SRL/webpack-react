const path = require('path');
const webpack = require('webpack');

const NODE_MODULES = path.join(__dirname, '../node_modules');
const APP_DIR = path.join(__dirname, '../src');

module.exports = {
    // By default its value is ./src/index.js
    entry  : path.resolve(__dirname, '../src/index.js'),
    output : {
        path       : path.resolve(__dirname, '../dist'),
        filename   : '[name].[contenthash:8].js',
        publicPath : '/',
    },
    module: {
        rules: [
            {
                test    : /\.(png|gif|jpg|svg)$/,
                exclude : NODE_MODULES,
                loader  : 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            GALLERY_IMAGES      : JSON.stringify(5),
            VERSION             : JSON.stringify('0.3.17'),
            APP_NAME            : JSON.stringify('MyShop4'),
            CONTACT_EMAIL       : JSON.stringify('hello@myshop4.com'),
            DEFAULT_IMAGE       : JSON.stringify('https://d2g9qrpaqp4r7k.cloudfront.net/nopic.png'),
            DEFAULT_IMAGE_THUMB : JSON.stringify('https://d2g9qrpaqp4r7k.cloudfront.net/nopic_thumb.png'),
            SHORT_DELAY         : JSON.stringify(3000),
			MEDIUM_DELAY        : JSON.stringify(6000),
			LONG_DELAY          : JSON.stringify(15000),
        }),
    ],
    resolve: {
        extensions : ['*', '.js', '.jsx'],
        alias      : {
            '~app'        : path.resolve(APP_DIR),
            '~classes'    : path.resolve(APP_DIR, 'library/classes/'),
            '~components' : path.resolve(APP_DIR, 'library/components/'),
            '~constants'  : path.resolve(APP_DIR, 'library/constants/'),
            '~lang'       : path.resolve(APP_DIR, 'main/i18n/messages'),
            '~modules'    : path.resolve(APP_DIR, 'modules/'),
            '~store'      : path.resolve(APP_DIR, 'main/store/'),
            '~services'   : path.resolve(APP_DIR, 'main/services/'),
            '~utils'      : path.resolve(APP_DIR, 'library/utils/'),
            '~hooks'      : path.resolve(APP_DIR, 'library/hooks/'),
            '~styles'     : path.resolve(APP_DIR, 'resources/styles/'),
            '~translate'  : path.resolve(APP_DIR, 'main/i18n/translate'),
        },
    },
};
