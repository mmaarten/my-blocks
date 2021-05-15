# My Blocks
Bootstrap driven WordPress Blocks.

## Requirements
- [Node JS](https://nodejs.org)
- [Composer](https://getcomposer.org/)
- PHP >= 5.6
- [WordPress](https://wordpress.org/) >= 5.0

## Installation
1. [Download](https://github.com/mmaarten/my-blocks/archive/master.zip) and extract zip into `wp-content/plugins/` folder.
1. Run `npm install` to install dependencies.
1. Run `composer install` to install dependencies.
1. Run `npm run build` to compile assets.
1. Activate plugin via WordPress admin menu: Plugins.

## Development
Run `composer install` to install dependencies.

Run `npm install` to install dependencies.

### Build commands
Run `npm run start` to compile assets when files change.

Run `npm run build` to compile and optimise assets.

Run `npm run bundle` to create distribution archive.

Run `composer run make-pot` to create translation file.
