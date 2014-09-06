module.exports = function() {


  /**
  * If deploying or running grunt s3, you may run into an issue regarding "Too
  * many open files."
  *
  * This happens at the OS level and can be circumvented via:
  *   http://unix.stackexchange.com/questions/108174/how-to-persist-ulimit-settings-in-osx-mavericks/109488#109488
  */
  return {
    options: {
      key: '<%= aws.key %>',
      secret: '<%= aws.secret %>',
      bucket: '<%= aws.bucket %>',
      access: 'public-read',
      maxOperations: 10,
      gzip: true,
      verify: true
      // headers: {
      //   // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
      //   "Cache-Control": "max-age=630720000, public",
      //   "Expires": new Date(Date.now() + 63072000000).toUTCString()
      // }
    },

    prod: {
      upload: [
        {
          src: 'build/images/**/*',
          dest: 'images/',
          rel: 'build/images/',
        },
        {
          src: 'build/js/**/*',
          dest: 'js/',
          rel: 'build/js/',
        },
        {
          src: 'build/stylesheets/**/*',
          dest: 'stylesheets/',
          rel: 'build/stylesheets/',
        }
      ]
    }
  };

};
