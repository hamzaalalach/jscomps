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
			describe: 'Custom output file.',
			type: 'string',
			demandeOption: false,
			nargs: 1
		},
		'i': {
			describe: 'Custom input file.',
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
	.demandOption(['f'], "Please provide -f to be able to continue.")
	.example('$0 -f public/js/dashbaord')
	.example('$0 -f public/js/dashbaord -m false')
    .alias('h', 'help')
    .alias('v', 'version')
	.help()
	.argv;

var fsWait = false,
	inputPath,
	outputPath;

if (!fs.lstatSync(argv.f).isDirectory()) {
	console.log("No folders match, please try again!");
}
start(path.basename(argv.f));

function start(folder) {
	if (argv.f[argv.f.length - 1] == '/') {
		argv.f = argv.f.substr(0, argv.f.length - 1);
	}
	if (argv.i) {
		inputPath = argv.i;
	} else {
		inputPath = argv.f + '/' + folder + '.js';
	}
	if (argv.o) {
		outputPath = argv.o;
	} else {
		outputPath = argv.f + '/' + folder + '.min.js';
	}
	console.log('Waiting for changes...');
	fs.watch(argv.f, function(event) {
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
				console.log("Files imported");
			});
		}
	});
}