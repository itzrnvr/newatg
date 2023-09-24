module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'nativewind/babel',
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.json',
                    '.ts',
                    '.tsx',
                ],
                alias: {
                    utils: './src/utils',
                },
            },
        ],
    ],
};
