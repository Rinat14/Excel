const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('sass-loader');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundel.${ext}` : `bundel.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
			plugins: ['@babel/plugin-proposal-class-properties']
		},
		},
	];
	if (isDev) {
		loaders.push('eslint-loader');
	}
	return loaders;
}
module.exports = {
	context: path.resolve(__dirname, 'source'),
	mode: 'development',
	entry: ['@babel/polyfill', './main-script.js'],
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js'],
		alias: {
		'@': path.resolve(__dirname, 'source'),
		'@core': path.resolve(__dirname, 'source/core'),
		},
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 3000,
		hot: isDev,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'source/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	],
	module: {
		rules: [
		{
			test: /\.s[ac]ss$/i,
			use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'sass-loader',
			],
		},
		{
			test: /\.m?js$/,
			exclude: /node_modules/,
			use: jsLoaders(),
		},
		],
	},
}