var lessPath = [
  './apps/shared/lib',
  './apps/shared/stylesheets'
];

module.exports = {
  compileSignup: {
    files: {
      'apps/signup/public/stylesheets/signup.compiled.css': 'apps/signup/public/stylesheets/signup.less',
    },
    options: {
      paths: lessPath
    }
  },

  distSignup: {
    files: {
      'build/stylesheets/signup.compiled.css': 'apps/signup/public/stylesheets/signup.less',
    },
    options: {
      cleancss: true,
      paths: lessPath
    }
  },

  compileShabu: {
    /*
    * Temporary until we rewrite claim to use new styles. We want to freeze
    * claim flow's stylesheet for the time being.
    */
    files: {
      'apps/shabu/public/stylesheets/shabu.compiled.css': 'apps/shabu/public/stylesheets/shabu.less',
      'apps/shabu/public/stylesheets/webviews.compiled.css': 'apps/shabu/public/stylesheets/webviews.less'
    },
    options: {
      cleancss: false,
      dumpLineNumbers: 'comments',
      paths: lessPath
    }
  },

  distShabu: {
    files: {
      'build/stylesheets/shabu.compiled.css': 'apps/shabu/public/stylesheets/shabu.less',
      'build/stylesheets/webviews.compiled.css': 'apps/shabu/public/stylesheets/webviews.less'
    },
    options: {
      cleancss: true,
      paths: lessPath
    }
  },

  compileClaims: {
    /*
    * Temporary until we rewrite claim to use new styles. We want to freeze
    * claim flow's stylesheet for the time being.
    */
    files: {
      'apps/claims/public/stylesheets/claims.compiled.css': 'apps/claims/public/stylesheets/claims.less',
    },
    options: {
      cleancss: true,
      paths: lessPath
    }
  },

  distClaims: {
    files: {
      'build/stylesheets/claims.compiled.css': 'apps/claims/public/stylesheets/claims.less',
    },
    options: {
      cleancss: true,
      paths: lessPath
    }
  },

  marketingSite: {
    files: {
      'build/stylesheets/marketing.compiled.css': 'apps/marketing/public/stylesheets/site.less'
    },
    options: {
      paths: lessPath
    }
  }
};
