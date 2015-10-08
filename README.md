Jargon Generator
================

Build Tools
-----------

This project uses the following tools:

- Node Packaged Modules: https://www.npmjs.org/
- Grunt JavaScript Task Runner: http://gruntjs.com/

How to Build
------------

__Installing Node Modules__

After downloading the source code from GitHub and configuring NPM and Grunt, you'll need to navigate to the root directory of the source tree, where package.json and Gruntfile.js are located.  From there, run the command ```npm install``` to pull in all the necessary node modules.  This will generate the node_modules folder.

__Building Debug__

Once all the node packages have been installed, firing off a debug build is as simple as running the ```grunt``` command from the root directory.  This will generate the "build/debug" directory, where the debug website content will be built to.

__Building Release__

The release version of the website will run the additional step of uglifying all JavaScript code.  To fire off a release build, use the command ```grunt --config=release```.  This will generate the "build/release" directory, where the release version of the website will be build to.

How to Publish
--------------

This step has not yet been automated, so for now the only way to publish is to use an FTP client and upload the content manually.