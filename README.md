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
Consider we are in the following folder:
```
    js/
       dashboard/
         dashboard.js
         header.js
         nav.js
         sideBar.js

```
Each of the files has the following content:
- header.js:
```    console.log("Header script is running..."); ```
- nav.js:
```    console.log("Nav script is running..."); ```
- sideBar.js:
```    console.log("Sidebar script is running..."); ```

Our import file, which is dashboard.js the same as our component folder's name, should look like this:
```
    import "header";
    import "nav";
    import "sideBar"
```
We can now watch for changes and automatically concat and compress our component running the following command:
```     
    jscomps -f js/dashboard
```
We can make a small change to any of the 3 pieces to trigger the change detection, and the output would be ```dashboard.min.js``` which you can simply add to your HTML.
