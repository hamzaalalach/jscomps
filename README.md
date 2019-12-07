# jscomps

JSComps is a lightweight solution to enable components support on Vanilla JS. <br /><br />

#### Note:
- JSComps is a CLI package, check usage below.<br />

#### Why not just create multiple HTML files and link them to HTML instead?
Using JSComps give your the following perks:

- It generates one simple file as input giving multiple as input, by linking only one external JS file, you're reducing your HTTP requests, making your app faster and more performent.
- It makes your app easily scalable. You can address each part of your website with JavaScript individually, making it easy to focus on and edit your code, and expanding its functionalities at ease.
- It's easy to use. You don't have to run it each time you make a change to a file, it'll automatically detect changes for you and import the mto your output file.<br /><br />

## Install
    npm install jscomps -g

## Usage
    jscomps [options]

  JSComps takes a folder as input and it works as the components container, it detects changes in it, if any made it'll import all the components into the minified output file. By default, the imports should be contained in the provided folder under the same name, and the output looks like this: providedfoldername.min.js. See examples below.
  
  
## Options

```

  -f             Component folder to watch.                        [string] [required]
  -o             Custom output file path.                                     [string]
  -i             Custom input file path.                                      [string]
  -m             Minify and compress output file.            [boolean] [default: true]
  -h, --help     Show help.                                                  [boolean]
  -v, --version  Show version number.                                        [boolean]
  
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
We can now watch for changes and automatically concat our component pieces running the following command:
```     
 jscomps -f js/dashboard -m false
```
Making any change to the 3 pieces of our component will trigger the output file to be generated ```dashboard.min.js ``` in the dashoard folder, containing the following code:

```
 console.log("Header script is running...");
 console.log("Nav script is running...");
 console.log("Sidebar script is running...");
```

To compress the output code simply remove the -m parameter as it is by default set to true:
```
 jscomps -f js/dashboard
```

To provide a custom input and/or output file path, use the -o and -i commands:
```
 jscomps -f js/dashboard -i js/dashboard/index.js -o js/dashboard.js
```

The best way to use JSComps is to add it to your package.json file like this: 
```
  "scripts": {
    "jscomps:dashboard": "jscomps -f public/js/dashboard"
  }
```
Then your run it easily like this:  ` npm run jscomps:dashboard `
