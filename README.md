# jscomps

JSComp is a lightweight solution to enable components support on Vanilla JS.

#### Note:
- JSComps is a CLI package, check usage below.

## Install
    npm install jscomps -g

## Usage
    jscomps [options]

  JSComps takes a folder as input, functions as the components container, it detects changes in it, if any made it'll import all the components into the minified output file. By default, the imports should be contained in the provided folder under the same name, and the output looks like this: providedfoldername.min.js. See examples below.
  
  
## Options

```

  -f             Component folder to watch.                   [string] [required]
  -o             Custom output file.                                     [string]
  -i             Custom input file.                                      [string]
  -m             Minify and compress output file.       [boolean] [default: true]
  -h, --help     Show help.                                             [boolean]
  -v, --version  Show version number.                                   [boolean]
  
```
## Examples
