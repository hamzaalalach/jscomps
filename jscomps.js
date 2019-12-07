#!/usr/bin/env node

const fs = require('fs'),
	uglifyjs = require('uglify-js'),
	path = require('path'),
	argv = require('yargs')
	.usage('Usage: $0 [options]')
	.options({
		'f': {
			describe: 'Component folder to watch.',
			type: 'string',
			demandeOption: true,
			nargs: 1
		},
		'o': {
			describe: 'Custom output file path.',
			type: 'string',
			demandeOption: false,
			nargs: 1
		},
		'i': {
			describe: 'Custom input file path.',
			type: 'string',
			demandeOption: false,
			nargs: 1
		},
		'm': {
			describe: 'Minify and compress output file.',
			default: true,
			boolean: true,
			demandeOption: false,
			nargs: 1
		}
	})
	.demandOption(['f'], "Please provide a folder to watch.")
	.example('$0 -f public/js/dashbaord')
	.example('$0 -f public/js/dashbaord -m false')
    .alias('h', 'help')
    .alias('v', 'version')
	.help()
	.argv;

let fsWait = false,
	inputPath,
	outputPath,
	folderName;

const setup = (folderName, cb) => {
	fs.stat(argv.f, (err, stats) => {
		if (err || !stats.isDirectory()) {
			cb(false);
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
			cb(true);
		}
	});
}

const start = folderPath => {
	fs.watch(folderPath, function(event) {
		if (event === 'change') {
			if (fsWait) return;
			fsWait = setTimeout(() => {
				fsWait = false;
			}, 1000);
			let result;
			if (argv.m) {
				result = uglifyjs.minify((require('import')(inputPath)), {compress: true}).code;
				if (result.error) console.log(result.error);
			} else {
				result = require('import')(inputPath);
			}
			fs.writeFile(outputPath, result, function(err) {
				if (err) throw err;
				console.log("Files imported.");
			});
		}
	});
}

setup(null, (ok) => {
	if (ok) {
		start(argv.f);
		console.log('Waiting for changes...');
	} else {
		console.log("Not a valid watch folder.");
	}
});