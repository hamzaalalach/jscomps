<h1 align="center"> JSComps </h1>
<p align="center">
  <b >JSComps is a lightweight CLI solution to enable components support on Vanilla JS.</b>
</p>

<br>


[![Build Status](https://travis-ci.org/hamzaalalach/jscomps.svg?branch=master)](https://travis-ci.org/hamzaalalach/jscomps) ![NPM](https://img.shields.io/npm/l/jscomps) 
![npm](https://img.shields.io/npm/v/jscomps) 
![GitHub last commit](https://img.shields.io/github/last-commit/hamzaalalach/jscomps)


## Description
   JSComps helps you chunk Vanilla JS into small and scalable components. It takes a folder as input which works as the components container, it detects changes in it, if any made it'll automatically import all the parts into the minified output file. By default, the imports should be contained in the provided folder under the same name, and the output looks like this: providedfoldername.min.js. [See examples below.](#examples) <br><br>
   
   
## Install

```bash
npm install jscomps -g
```

```bash
yarn add jscomps
```
<br>

## Recent changes
  - New command: --iife, wraps the entire output code in a IIFE, default value: false. 🆕
  - Logging improved: Mention which file triggered the change. 📝

<br>

## Usage
    jscomps [options]

   Please make sure it's installed globally.<br><br>
  
  
## Options

```text

  -f             Component folder.                                 [string] [required]
  -w             Watch a directory for changes.              [boolean] [default: true]
  -o             Custom output file path.                                     [string]
  -i             Custom input file path.                                      [string]
  -m             Minify and compress output file.            [boolean] [default: true]
  --iife         Wrap output code in an IIFE.               [boolean] [default: false]
  -h, --help     Show help.                                                  [boolean]
  -v, --version  Show version number.                                        [boolean]
  
```
<br><br>
## Examples
Consider we are in the following folder:
```
 js/
 └── dashboard/
    ├── dashboard.js
    ├── header.js
    ├── nav.js
    └── sideBar.js

```
Each of the files has the following content:
- header.js:
```javascript
 console.log("Header script is running...");
```
- nav.js:
```javascript
 console.log("Nav script is running...");
```
- sideBar.js:
```javascript
 console.log("Sidebar script is running...");
```

The import file, which is dashboard.js by default, should look like this:
```javascript
 import "header";
 import "nav";
 import "sideBar";
```
We can now watch for changes and automatically concatenate our component pieces running the following command:
```bash
 jscomps -f js/dashboard -m false
```
Making any change to the 3 pieces of our component will trigger the output file to be generated ```dashboard.min.js```  in the dashboard folder, containing the following code:

```javascript
 console.log("Header script is running...");
 console.log("Nav script is running...");
 console.log("Sidebar script is running...");
```

To compress the output code simply remove the -m parameter as it is by default set to true:
```bash
 jscomps -f js/dashboard
```
We can stop watching for changes and use the command only once:
```bash
 jscomps -f js/dashboard -w false
```

To provide a custom input and/or output file path, use the -o and -i commands:
```bash
 jscomps -f js/dashboard -i js/dashboard/index.js -o js/dashboard.js
```

If you like to wrap the output code in an IIFE, use --iife command:
```bash
 jscomps -f js/dashboard --iife true
```

The best way to use JSComps is to add it to your package.json file like this: 
```json
  "scripts": {
    "jscomps:dashboard": "jscomps -f public/js/dashboard"
  }
```
Then you simply run:  ` npm run jscomps:dashboard ` <br><br>

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/hamzaalalach/jscomps/tags).<br><br>

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE) file for details.
