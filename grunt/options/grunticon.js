module.exports = {
  options: {
    // Folder name (within dest) for png output
    pngDestDir: 'png',

    // Set to false to disable HTML generation
    previewFile: false,
    // snippetFile: false,

    // Use brew-installed binaries
    phantomjs: false,
    pngcrush: false,

    svgDataCSS: 'svg.css',
    pngDataCSS: 'png.css',
    pngFileCSS: 'fallback.css',

    // Template files
    snippetTemplate: 'grunt/templates/grunticon/snippet.html',
    cssDataTemplate: 'grunt/templates/grunticon/data.css',
    cssFileTemplate: 'grunt/templates/grunticon/file.css',
  },

  // Icons
  icons: {
    files: [{
      expand: true,
      cwd: 'apps/shared/images/icons',
      src: ['**/*.{png,svg}']
    }],
    options: {
      cssPrefix: 'icon-',
      dest: 'apps/shared/stylesheets/icons',
      // Publicly-accessible path to the CSS files
      cssBasePath: '/public/build/icons/'
    }
  },

  // Non-icon PNG/SVG assets
  assets: {

    files: [{
      expand: true,
      cwd: 'apps/shared/images/assets',
      src: ['*.{png,svg}']
    }],

    options: {
      cssPrefix: 'asset-',
      dest: 'apps/shared/stylesheets/assets',
      cssBasePath: '/public/build/assets/'
    }

  }

};
