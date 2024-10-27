const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин для работы с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин для очистки dist перед сборкой
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // объединение css файлов в один

// module.exports — это синтаксис экспорта в Node.js 
module.exports = {
    // точка входа
    entry: {
        main: './src/scripts/index.js'
    },

    // точка выхода
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.min.js',
        publicPath: '', // свойство для обновления путей внутри CSS- и HTML-файлов
    },

    // добавили режим разработчика
    mode: 'production',  // добавили режим разработчика

    // настройка локального сервера
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true, // сайт будет открываться сам при запуске npm run dev
    },

    // описание правил обработки файлов при сборке
    module: {
        // массив правил
        rules: [
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader',  // при обработке этих файлов нужно использовать babel-loader
                exclude: '/node_modules/', // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: 
                [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },

    // плагины проекта
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
}