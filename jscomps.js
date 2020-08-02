#!/usr/bin/env node

const fs = require('fs'),
	uglifyjs = require('uglify-js'),
	path = require('path'),
	chalk = require('chalk'),
	load = require('./importer'),
	argv = require('yargs')
		.usage('Usage: $0 [options]')
		.options({
			f: {
				describe: 'Component folder.',
				type: 'string',
				demandeOption: true,
				nargs: 1
			},
			w: {
				describe: 'Watch a directory for changes.',
				default: true,
				boolean: true,
				demandeOption: false,
				nargs: 1
			},
			o: {
				describe: 'Custom output file path.',
				type: 'string',
				demandeOption: false,
				nargs: 1
			},
			i: {
				describe: 'Custom input file path.',
				type: 'string',
				demandeOption: false,
				nargs: 1
			},
			m: {
				describe: 'Minify and compress output file.',
				default: true,
				boolean: true,
				demandeOption: false,
				nargs: 1
			},
			iife: {
				describe: 'Wrap the result in an IIFE.',
				default: false,
				boolean: true,
				demandeOption: false,
				nargs: 1
			}
		})
		.demandOption([ 'f' ], 'Please provide an folder file.')
		.example('$0 -f example')
		.example('$0 -f example -m false -w false -o exampleoutput.js')
		.alias('h', 'help')
		.alias('v', 'version')
		.help().argv;

let fsWait = false,
	inputPath,
	outputPath;

const setup = folderName => {
	return new Promise(function(resolve, reject) {
		fs.stat(argv.f, (err, stats) => {
			if (err || !stats.isDirectory()) {
				reject();
			} else {
				folderName = path.basename(argv.f);
				if (argv.f[argv.f.length - 1] == '/') {
					argv.f = argv.f.substr(0, argv.f.length - 1);
				}
				if (argv.i) {
					inputPath = argv.i;
				} else {
					inputPath = argv.f + '/' + folderName + '.js';
				}
				if (argv.o) {
					outputPath = argv.o;
				} else {
					outputPath = argv.f + '/' + folderName + '.min.js';
				}
				resolve();
			}
		});
	});
};

const startAndWatch = folderPath => {
	fs.watch(folderPath, function(event, filename) {
		if (event === 'change') {
			if (fsWait) return;
			fsWait = setTimeout(() => {
				fsWait = false;
			}, 1000);
		}
		setTimeout(() => {
			start(filename);
		}, 500);
	});
};

const start = filename => {
	load(inputPath)
		.then(importedCode => {
			let result;
			if (argv.m) {
				minifyOutput = uglifyjs.minify(importedCode, { compress: true });
				result = minifyOutput.code;
				if (minifyOutput.error) {
					console.log(minifyOutput.error);
					console.log(chalk.red('Minification error detected, waiting for changes...'));
					return;
				}
			} else {
				result = importedCode;
			}
			if (argv.iife) {
				let iifeStart = '(function() {';
				if (!argv.m) {
					iifeStart += '\n';
				}
				result = iifeStart + result + '})();';
			}
			fs.writeFile(outputPath, result, function(err) {
				if (err) throw err;
				filename
					? console.log(filename + ' changed: ' + chalk.green('Files imported.'))
					: console.log('Files imported.');
			});
		})
		.catch(error => {
			console.log(chalk.red(error));
		});
};

setup()
	.then(() => {
		if (argv.w) {
			console.log(chalk.green('Watching folder: ' + chalk.white(argv.f)));
			console.log(chalk.green('Waiting for changes...'));
			startAndWatch(argv.f);
		} else {
			start();
		}
	})
	.catch(() => console.log(chalk.red('Not a valid watch folder.')));
