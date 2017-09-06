# Starter package based on gulp

A simple project structure for promo-sites or multi-page applications. Provides a starter package with
ready-to-use environment.
NOTE: all run command need execute from a project root folder.

## Features

* jQuery-free (NOTE: jQuery can be added)
* Uses Html templates
* Uses LESS or SASS framework for stylesheets or clear CSS
* Allows to get the release in one command (NOTE: configurable)
* And many others!

## Get started

* Checkout this repository to your hard drive
* Download and install the latest version of [node.js](http://nodejs.org)
* Run `npm install` to install node modules
* Run `npm install -g gulp` to install Gulp
* Run export PATH=./node_modules/.bin:$PATH for ubuntu
* Run `npm run serve`
NOTE: the project uses LESS and SASS frameworks for CSS styles, that is compiled in runtime.
If you run this website on the file system, it is highly recommended to use Google Chrome with flag __--disable-web-security__.
As an option, you can also host the website on any server (IIS, node.js, Apache etc.).

## Tasks

* Run `serve` to start working with project (it is build html, open localhost and start you site)
* Run `build` to compile you project like dist version (minified and uglified) in dist folder
* Run `debug` to compile you project like debug version in dist folder
* Run `html` to build htmls in app folder
* NOTE: if you use a terminal for running task, type `npm run` before task name. Command should look like `npm run serve`, `npm run build`, etc.

## Folder structure

* app - contains static files (fonts, images, documents, swf etc.)
	* resources - contains all static elements (fonts, images, documents, swf etc.)
	* scripts - contains all custom Javascript code
	* styles
		* css-contains all css files
		* scss-contains all scss files
		* less-contains all less files
	* pages - contains all Html pages
	* templates - contains all Html pages parts
* dist - this folder contain release or development version of site
